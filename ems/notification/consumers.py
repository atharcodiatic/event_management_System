# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import pdb 
import logging
from channels.db import database_sync_to_async

logger = logging.getLogger(__name__)
logger.info("This log shows up")

class TestConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print('connecteddd')
        logger.info("connecttttttedd")
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.close()
    async def receive(self, text_data=None):
        data = json.loads(text_data)
        await self.send(text_data = json.dumps({'message':'message from server side *> '}))



class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            logger.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Client connected to WebSocket')
            await self.channel_layer.group_add('notification_group', self.channel_name)
            await self.accept()
                 
        except Exception as e:
            logger.error(f'Error in WebSocket connection: {e}')
            await self.close()
            
    async def receive(self, text_data):
        
        text_data_json = json.loads(text_data)
        if isinstance(text_data_json, dict):
            notification_id = text_data_json.get('notification_id', '')
            
            if notification_id:
                notification_obj = await self.get_notification_by_id(notification_id)
                
                if notification_obj:
                    await self.mark_notification_as_read(notification_obj)
            
        # Echo the received message back to the client
        await self.send(text_data=json.dumps({
            'message': 'server send okKkkkkk: '
        }))
        
    @database_sync_to_async
    def get_notification_by_id(self, notification_id):
        from .models import Notification
        try:
            return Notification.objects.get(id=notification_id)
        except Notification.DoesNotExist:
            return None

    @database_sync_to_async
    def mark_notification_as_read(self, notification_obj):
        notification_obj.is_read = True
        notification_obj.save()
            
    async def disconnect(self, close_code):
        # Handle disconnection
        await self.channel_layer.group_discard('notification_group', self.channel_name)
        
    async def send_notification(self, event):
        notification = event['notification']
        await self.send(text_data = json.dumps({'notification': notification}))
