from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    '''
     Event Creation, Scheduling, and Management
    Create Event:  POST request to /api/events/.
    List Events: Use the GET request to /api/events/.
    Read Event Details:  GET request to /api/events/<id>/.
    Update Event:  PUT or PATCH request to /api/events/<id>/.
    Delete Event: Use the DELETE request to /api/events/<id>/.
    '''
    queryset = Event.objects.all()
    serializer_class = EventSerializer
