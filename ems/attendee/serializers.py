from rest_framework import serializers
from .models import UserActivity
from .models import UserActivity, Attendee 

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        
        exclude = 'user'


class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = '__all__'
