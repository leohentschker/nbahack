from django.db import models
from datasets.models import Dataset
import random
import string
import json
import uuid
import os

def randString():
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))

class PredictionModel(models.Model):
    name = models.CharField(unique=True, max_length=60)
    code = models.TextField(null=True)
    file = models.TextField(null=True)
    parameterJSON = models.TextField(null=True)
    trained = models.BooleanField(default=False)

    @property
    def abs_location(self):
        return os.path.abspath(self.file)

    def save(self, *args, **kwargs):
        if not self.file:
            self.file = "predictors/saved_models/" + randString() + ".py"

        with open(self.abs_location, "wb+") as f:
            f.write(self.code)

        return super(PredictionModel, self).save(*args, **kwargs)

    @property
    def model(self):
        module = self.file.replace(".py", "").replace("/", ".")
        Model = None
        exec("from " + module + " import Model")
        
        if self.parameterJSON and json.loads(self.parameterJSON):
            parameters = json.loads(self.parameterJSON)
            return Model.from_parameters(parameters)
        else:
            return Model()

    def train(self, dataset):
        parameters = self.model.train(dataset.dataframe)
        self.parameterJSON = json.dumps(parameters)
        self.trained = True
        self.save()

    def train_async(self, dataset):
        command = "cd /Users/leohentschker/nbahack/backend && /usr/bin/python manage.py train_model " + str(self.id) + " " + str(dataset.id) + " &"
        os.system(command)

    def predict(self, dataset):
        output = self.model.predict(dataset.dataframe)
        prediction = Prediction.objects.get(model=self, dataset=dataset)
        prediction.results = output
        prediction.complete = True
        prediction.save()
        self.save()

    def predict_async(self, dataset):
        prediction = Prediction.objects.get(model=self, dataset=dataset)
        prediction.complete = False
        self.save()
        command = "cd /Users/leohentschker/nbahack/backend && /usr/bin/python manage.py predict_model " + str(self.id) + " " + str(dataset.id) + " &"
        os.system(command)


class Prediction(models.Model):
    dataset = models.ForeignKey(Dataset)
    model = models.ForeignKey(PredictionModel)
    results = models.TextField(null=True)
    complete = models.BooleanField(default=False)