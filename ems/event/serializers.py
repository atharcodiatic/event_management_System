from rest_framework import serializers
from .models import Event
from django.contrib.auth.models import User

class EventSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.all().first()
        return Event.objects.create(**validated_data , created_by = user )
    class Meta:
        model = Event
        fields = '__all__'
    