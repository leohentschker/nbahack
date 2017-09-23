from django.http import JsonResponse
import datetime

def games(request):
    return JsonResponse({"foo": "bar"})