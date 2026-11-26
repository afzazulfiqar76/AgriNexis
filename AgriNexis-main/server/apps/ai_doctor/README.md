# AI Doctor Backend

This app provides plant-leaf prediction endpoints, private prediction history, and disease information.

Genuine TensorFlow/Keras predictions require:

1. A `.h5` or `.keras` model file.
2. A JSON class-label file.
3. TensorFlow and NumPy installed.
4. Matching image size and preprocessing configuration.

Set these environment variables:

```text
AI_DOCTOR_MODEL_PATH=media/ai-doctor/models/plant_disease.keras
AI_DOCTOR_LABELS_PATH=media/ai-doctor/models/class_labels.json
AI_DOCTOR_IMAGE_WIDTH=224
AI_DOCTOR_IMAGE_HEIGHT=224
AI_DOCTOR_PREPROCESSING=keras_rescale
```

Without these files, `POST /api/ai-doctor/predict/` returns `503 MODEL_NOT_CONFIGURED` and never produces fake predictions.
