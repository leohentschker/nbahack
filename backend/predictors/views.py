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

def getFilename():
    name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
    return os.path.abspath(os.path.join("nbahack/models", name + ".py"))

def saveModel(request):
    try:
        data = json.loads(request.body)
        code = str(data["code"])
        modelName = str(data["modelName"])
    except Exception as e:
        return HttpResponseBadRequest("Invalid submit request")

    model, created = PredictionModel.objects.get_or_create(name=name)
    model.code = code
    model.save()
    return JsonResponse({})

def getModel(request, name=None):
    model = get_object_or_404(PredictionModel, name=name)
    return JsonResponse({"code": model.code})

def trainModel(request, name=None):
    model = get_object_or_404(PredictionModel, name=name)
    parameters = model.train()
    model.parameterJSON = json.dumps(parameters)
    model.save()
    return JsonResponse({})

def predict(request):
    try:
        data = json.loads(request.body)
        modelName = str(data["modelName"])
        dataset = data["trainingSet"]
    except Exception as e:
        return HttpResponseBadRequest("Invalid submit request")

    model = get_object_or_404(PredictionModel.objects, name=name)
    model.predict(dataset)
    return JsonResponse({})