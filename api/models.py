from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.
class Subfamily(models.Model):
    idsubfamily = models.CharField(primary_key=True, max_length=150)
    namesubfamily = models.CharField(max_length=150)

