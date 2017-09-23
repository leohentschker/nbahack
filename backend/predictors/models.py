from django.db import models


class PredictionModel(models.Model):
    name = models.CharField(unique=True, max_length=60)
    code = models.TextField(null=True)
    parameterJSON = models.TextField(null=True)

    def train(self):
    	print "I AM GOING TO TRAIN"

    def predict(self, dataset):
    	print "I AM GOING TO PREDICT", dataset