# Generated by Django 4.0.2 on 2022-03-08 07:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('translation', '0003_convertedfile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='convertedfile',
            old_name='myfiles',
            new_name='myfile',
        ),
    ]