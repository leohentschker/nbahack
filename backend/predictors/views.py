from django.http import (
    HttpResponseBadRequest,
    JsonResponse,
)
from django.shortcuts import get_object_or_404
import random
import string
import json
import os

from predictors.models import PredictionModel
from datasets.models import Dataset

def getFilename():
    name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
    return os.path.abspath(os.path.join("nbahack/models", name + ".py"))

def saveModel(request):
    try:
        data = json.loads(request.body)
        print data, "DATA"
        code = str(data["code"])
        name = str(data["modelName"])
    except Exception as e:
        return HttpResponseBadRequest("Invalid submit request")

    print "GONNA SAVE THE MOOODEL", code
    model, created = PredictionModel.objects.get_or_create(name=name)
    model.code = code
    model.save()
    return JsonResponse({})

def rename(request, name=None, newName=None):
    model = get_object_or_404(PredictionModel, name=name)
    model.name = newName
    model.save()
    return JsonResponse({})

def getModel(request, name=None):
    model = get_object_or_404(PredictionModel, name=name)
    return JsonResponse({"code": model.code})

def trainModel(request):
    try:
        data = json.loads(request.body)
        name = str(data["modelName"])
        datasetName = str(data["dataset"])
    except Exception as e:
        return HttpResponseBadRequest("Invalid prediction request")
    model = get_object_or_404(PredictionModel, name=name)
    dataset = get_object_or_404(Dataset, name=datasetName)
    parameters = model.train(dataset)
    model.parameterJSON = json.dumps(parameters)
    model.trained = True
    model.save()
    return JsonResponse({})

def predict(request):
    try:
        data = json.loads(request.body)
        name = str(data["modelName"])
        datasetName = str(data["dataset"])
    except Exception as e:
        return HttpResponseBadRequest("Invalid prediction request")

    model = get_object_or_404(PredictionModel, name=name)
    dataset = get_object_or_404(Dataset, name=datasetName)

    model.predict(dataset)
    return JsonResponse({})

def listModels(request):
    models = PredictionModel.objects.all()
    serializedModels = [
        {"name": model.name, "code": model.code, "id": model.id, "trained": model.trained}
        for model in models
    ]
    return JsonResponse({"models": serializedModels})