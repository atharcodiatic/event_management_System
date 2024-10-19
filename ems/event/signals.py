from django.dispatch import receiver
from django.db.models.signals import  post_save, pre_save
from .models import *
import uuid 
from notification.models import *
from django.contrib.auth.models  import User
from django.db import transaction


@receiver(post_save, sender= Event)
def create_notification(sender, instance,created, **kwargs):
    users = User.objects.exclude(username = instance.created_by.username)

    for user in users:
        not_obj = Notification(recipient = user, event=instance,
                                         message= f'event notification from {instance.created_by.username} for {instance.title}' )
        not_obj.save()
    return True