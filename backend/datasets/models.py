from django.db import models

class Dataset(models.Model):
    name = models.CharField(unique=True, max_length=60)
    fileLocation = models.TextField(null=True)