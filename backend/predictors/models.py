from django.db import models


class PredictionModel(models.Model):
    name = models.CharField(unique=True, max_length=60)
    code = models.TextField(null=True)
    parameterJSON = models.TextField(null=True)
    trained = models.BooleanField(default=False)

    def train(self, dataset):
    	print "I AM GOING TO TRAIN"
    	return {}

    def predict(self, dataset):
    	print "I AM GOING TO PREDICT", dataset