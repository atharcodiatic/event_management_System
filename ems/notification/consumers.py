# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Handle disconnection
        pass

    async def receive(self, text_data):
        # Handle incoming WebSocket messages
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
