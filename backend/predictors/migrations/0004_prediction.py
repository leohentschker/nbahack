# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-24 04:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('datasets', '0001_initial'),
        ('predictors', '0003_predictionmodel_trained'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prediction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('results', models.TextField(null=True)),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='datasets.Dataset')),
                ('prediction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='predictors.PredictionModel')),
            ],
        ),
    ]
