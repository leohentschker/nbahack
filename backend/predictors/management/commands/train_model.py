from django.core.management.base import BaseCommand, CommandError
from predictors.models import PredictionModel
from datasets.models import Dataset
from optparse import make_option
import time

class Command(BaseCommand):
    help = 'Train models in the background'

    def add_arguments(self, parser):
        parser.add_argument('model_id', type=int)
        parser.add_argument('dataset_id', type=int)

    def handle(self, *args, **options):
        model = PredictionModel.objects.get(id=options["model_id"])
        dataset = Dataset.objects.get(id=options["dataset_id"])
        time.sleep(10)
        model.train(dataset)
