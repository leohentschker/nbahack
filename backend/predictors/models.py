from django.db import models


class PredictionModel(models.Model):
    name = models.CharField(unique=True, max_length=60)
    code = models.TextField()
    parameterJSON = models.TextField()

    def train(self):
    	print "I AM GOING TO TRAIN BIH"