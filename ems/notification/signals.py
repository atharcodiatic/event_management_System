from django.dispatch import receiver
from django.db.models.signals import  post_save, pre_save
from .models import *
from django.contrib.auth.models  import User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender= Notification)
def push_notification(sender, instance, created ,**kwargs):
    print(created)
    if created:
        print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.push Notification ON ')
        channel_layer = get_channel_layer()
        print(channel_layer)
        #sending message to websocket group 
        async_to_sync(channel_layer.group_send)('notification_group',
                                                {'type':'send_notification', # must match method on consumer
                                                 'notification': f"{instance.message} for {instance.event.title}{instance.event.id}"}
                                                )
        print('sync to sync runs')
    
    return