from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        print("Disconnected")

    def receive(self, text_data):
        data = json.loads(text_data)
        print(data)

        self.send(text_data=json.dumps({
            "message": f"You said: {data['message']}"
        }))
        