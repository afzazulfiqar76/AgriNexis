"""Verified, general plant-disease information.

This mapping is intentionally limited to classes supplied by the future trained
model. It must not invent disease classes or pesticide doses.
"""

DISEASE_INFORMATION = {
    # Entries are added only after the trained model and its class labels are supplied.
}

SUPPORTED_PLANTS = (
    'Coriander',
    'Tomato',
    'Green Chillies',
    'Rose',
    'Marigold',
)


def get_disease_information(disease_name):
    entry = DISEASE_INFORMATION.get(disease_name)
    if entry:
        return entry
    return {
        'plant_name': None,
        'disease_name': disease_name,
        'symptoms': [],
        'treatment': [
            'Verified remedy information is unavailable. Consult a local agricultural extension specialist.'
        ],
        'prevention': [
            'Upload a clear, well-lit leaf image and monitor the plant for changes.'
        ],
        'recommendations_available': False,
    }
