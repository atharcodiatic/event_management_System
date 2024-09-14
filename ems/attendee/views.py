from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Attendee, UserActivity
from .serializers import AttendeeSerializer, UserActivitySerializer

class AttendeeViewSet(viewsets.ModelViewSet):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer

class UserActivityViewSet(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Attendee)
def log_rsvp(sender, instance, created, **kwargs):
    if created:
        UserActivity.objects.create(
            user=instance.user,
            activity_type='RSVP',
            description=f"{instance.user.username} RSVP'd to {instance.event.title}"
        )
