# api/serializers.py
from rest_framework import serializers
from .models import Subfamily

class SubfamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subfamily
        fields = '__all__'
