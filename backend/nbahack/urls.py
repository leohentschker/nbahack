"""nbahack URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt

import views
from predictors.views import (
	predict,
	trainModel,
	saveModel,
	getModel,
    listModels,
)

from datasets.views import (
    listDatasets,
)

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^model/$', csrf_exempt(listModels)),
    url(r'^model/save/', csrf_exempt(saveModel)),
    url(r'^model/predict/', csrf_exempt(predict)),
    url(r'^model/(?P<name>\w{0,50})/$', csrf_exempt(getModel)),
    url(r'^model/train/(?P<name>\w{0,50})/$', trainModel),

    url(r'^datasets/$', csrf_exempt(listDatasets)),
]