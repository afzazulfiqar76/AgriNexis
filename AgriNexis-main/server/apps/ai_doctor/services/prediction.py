import importlib.util
import json
import threading
from pathlib import Path

from django.conf import settings


class ModelNotConfiguredError(RuntimeError):
    pass


class ModelLoadingError(RuntimeError):
    pass


class PredictionError(RuntimeError):
    pass


class PlantDiseasePredictionService:
    """Lazy, thread-safe loader for a TensorFlow/Keras plant disease model."""

    _model = None
    _labels = None
    _lock = threading.Lock()

    @classmethod
    def _configured_paths(cls):
        base_dir = Path(settings.BASE_DIR)
        model_path = Path(settings.AI_DOCTOR_MODEL_PATH)
        labels_path = Path(settings.AI_DOCTOR_LABELS_PATH)
        if not model_path.is_absolute():
            model_path = base_dir / model_path
        if not labels_path.is_absolute():
            labels_path = base_dir / labels_path
        return model_path, labels_path

    @classmethod
    def load(cls):
        if cls._model is not None:
            return cls._model, cls._labels

        model_path, labels_path = cls._configured_paths()
        if not model_path.exists():
            raise ModelNotConfiguredError(
                'A trained CNN model is not configured. Add the model file and labels file to enable real predictions.'
            )
        if not labels_path.exists():
            raise ModelNotConfiguredError(
                'A disease class-label file is not configured. Add the labels JSON file to enable real predictions.'
            )
        if importlib.util.find_spec('tensorflow') is None:
            raise ModelLoadingError(
                'TensorFlow is not installed in the Django environment.'
            )

        with cls._lock:
            if cls._model is not None:
                return cls._model, cls._labels
            try:
                from tensorflow import keras

                cls._model = keras.models.load_model(str(model_path), compile=False)
                with labels_path.open('r', encoding='utf-8') as handle:
                    raw_labels = json.load(handle)

                if isinstance(raw_labels, list):
                    cls._labels = raw_labels
                elif isinstance(raw_labels, dict):
                    if isinstance(raw_labels.get('class_names'), list):
                        cls._labels = raw_labels['class_names']
                    elif isinstance(raw_labels.get('labels'), list):
                        cls._labels = raw_labels['labels']
                    else:
                        cls._labels = [raw_labels[str(i)] for i in range(len(raw_labels))]
                else:
                    raise ValueError('Labels JSON must be a list or supported object.')

                if not cls._labels:
                    raise ValueError('The class-label file contains no labels.')
            except Exception as exc:
                cls._model = None
                cls._labels = None
                raise ModelLoadingError(f'The trained model could not be loaded: {exc}') from exc

        return cls._model, cls._labels

    @staticmethod
    def confidence_level(score):
        if score >= 80:
            return 'High'
        if score >= 60:
            return 'Medium'
        return 'Low'

    @classmethod
    def predict(cls, image_file):
        model, labels = cls.load()

        try:
            from PIL import Image, ImageOps
            import numpy as np

            image = Image.open(image_file)
            image.load()
            image = ImageOps.exif_transpose(image).convert('RGB')
            size = tuple(getattr(settings, 'AI_DOCTOR_IMAGE_SIZE', (224, 224)))
            image = image.resize(size)

            array = np.asarray(image, dtype=np.float32)
            preprocessing = getattr(settings, 'AI_DOCTOR_PREPROCESSING', 'keras_rescale')
            if preprocessing == 'imagenet':
                from tensorflow.keras.applications.imagenet_utils import preprocess_input
                array = preprocess_input(array)
            elif preprocessing == 'keras_rescale':
                array = array / 255.0

            probabilities = model.predict(np.expand_dims(array, axis=0), verbose=0)
            probabilities = np.asarray(probabilities)
            probabilities = probabilities.reshape(-1)

            if len(probabilities) != len(labels):
                raise PredictionError(
                    f'Model output count ({len(probabilities)}) does not match label count ({len(labels)}).'
                )

            index = int(np.argmax(probabilities))
            confidence = float(probabilities[index] * 100.0)
            if not (0.0 <= confidence <= 100.0):
                raise PredictionError('The model returned an invalid confidence score.')

            disease_name = str(labels[index])
            return {
                'plant_name': cls._infer_plant_name(disease_name),
                'disease_name': disease_name,
                'confidence_score': round(confidence, 2),
                'confidence_level': cls.confidence_level(confidence),
            }
        except PredictionError:
            raise
        except Exception as exc:
            raise PredictionError(f'The uploaded image could not be processed: {exc}') from exc

    @staticmethod
    def _infer_plant_name(disease_name):
        for plant_name in (
            'Coriander', 'Tomato', 'Green Chillies', 'Rose', 'Marigold'
        ):
            if disease_name.lower().startswith(plant_name.lower()) or plant_name.lower() in disease_name.lower():
                return plant_name
        return 'Unknown'
