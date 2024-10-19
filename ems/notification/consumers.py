# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import pdb 

import logging

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
        print(')))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))',data)
        await self.send(text_data = json.dumps({'message':'message from server side *> '}))



class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            logger.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Client connected to WebSocket')
            print('connecteddd')
            async_to_sync(self.channel_layer.group_add)('notification_group', self.channel_name)
            await self.accept()
                 
        except Exception as e:
            logger.error(f'Error in WebSocket connection: {e}')
            await self.close()
            
    async def receive(self, text_data):
        
        text_data_json = json.loads(text_data)
        print('data : ********************************************************************', text_data_json )
        # message = text_data_json['message']
    
        # Echo the received message back to the client
        await self.send(text_data=json.dumps({
            'message': 'server send you okKkkkkk: '
        }))
                    
    async def disconnect(self, close_code):
        # Handle disconnection
        await self.channel_layer.group_discard('notification_group', self.channel_name)
        
    # async def send_notification(self, event):
    #     print('sendiiiiiiiiiiiiiiiiiiiiiiiiiiiiiing nottttttttttttttttttttttttification')
    #     notification = event['notification']
    #     await self.send(text_data = json.dumps({'notification': notification}))
