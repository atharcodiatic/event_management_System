from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from event.models import Event

class Attendee(models.Model):
    '''
    Attendee model handles RSVPs. To manage RSVPs:
    Create RSVP: Use the POST request to /api/attendees/.
    List RSVPs: Use the GET request to /api/attendees/.
    Update RSVP: Use the PUT or PATCH request to /api/attendees/<id>/.
    Delete RSVP: Use the DELETE request to /api/attendees/<id>/.
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendances',blank=True, null=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='attendees')
    rsvp = models.BooleanField(default=False)
    attended_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} attending {self.event.title}"
    
class UserActivity(models.Model):
    """ model to track user activity """
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    activity_type = models.CharField(max_length=255) # view event rsvp 
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"

