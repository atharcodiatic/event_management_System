from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from event.models import Event

class Notification(models.Model):
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', blank=True, null=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.recipient.username} about {self.event.title}"
