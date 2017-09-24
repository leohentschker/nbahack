from django.http import (
    JsonResponse,
)

from datasets.models import Dataset

def listDatasets(request):
    datasets = Dataset.objects.all()
    serializedDatasets = [{"name": d.name, "id": d.id} for d in datasets]
    return JsonResponse({"datasets": serializedDatasets})