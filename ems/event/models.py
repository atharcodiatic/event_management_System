from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Event(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events_created', blank=True, null=True)

    def __str__(self):
        return self.title
