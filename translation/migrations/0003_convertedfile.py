# Generated by Django 4.0.2 on 2022-03-08 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('translation', '0002_myuploadfile'),
    ]

    operations = [
        migrations.CreateModel(
            name='convertedfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('myfiles', models.FileField(upload_to='')),
            ],
        ),
    ]
