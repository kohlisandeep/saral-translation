# Generated by Django 4.0.2 on 2022-03-11 07:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('translation', '0004_rename_myfiles_convertedfile_myfile'),
    ]

    operations = [
        migrations.DeleteModel(
            name='convertedfile',
        ),
    ]