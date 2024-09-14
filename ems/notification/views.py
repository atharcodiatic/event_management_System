from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Notification
from .serializers import NotificationSerializer
from .utility import send_reminder_email

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

