from django.db import models
import pandas as pd
import os

class Dataset(models.Model):
    name = models.CharField(unique=True, max_length=60)
    fileLocation = models.TextField(null=True)

    @property
    def abs_location(self):
    	return os.path.abspath(self.fileLocation)

    @property
    def dataframe(self):
    	return pd.read_csv(self.abs_location)