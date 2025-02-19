from flask import Flask, request, abort
from linebot.v3.messaging import MessagingApi, Configuration, ApiClient
from linebot.v3.webhook import WebhookHandler, MessageEvent
from linebot.v3.exceptions import InvalidSignatureError
from linebot.v3.messaging.models import ReplyMessageRequest, TextMessage, TemplateMessage, ButtonsTemplate, MessageAction, QuickReply, QuickReplyItem, CarouselTemplate, CarouselColumn
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get values from environment variables
line_channel_secret = os.getenv('LINE_CHANNEL_SECRET')
line_access_token = os.getenv('LINE_ACCESS_TOKEN')

config = Configuration(access_token=line_access_token)
with ApiClient(config) as api_client:
    line_bot_api = MessagingApi(api_client)

handler = WebhookHandler(line_channel_secret)

@app.route("/")
def hello():
    return "Hello LINE Bot!"

@app.route("/webhook", methods=['POST'])
def webhook():
    signature = request.headers.get('X-Line-Signature')
    body = request.get_data(as_text=True)

    app.logger.info("Request body: " + body)

    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'

@handler.add(MessageEvent)
def handle_message(event):
    user_message = event.message.text.lower()

    if user_message == "text":
        reply_message = TextMessage(text="นี่คือข้อความตอบกลับจากบอท!")

    elif user_message == "button":
        buttons_template = ButtonsTemplate(
            text="เลือกตัวเลือก", actions=[
                MessageAction(label="Option 1", text="คุณเลือก Option 1"),
                MessageAction(label="Option 2", text="คุณเลือก Option 2")
            ]
        )
        reply_message = TemplateMessage(alt_text="Button Template", template=buttons_template)

    elif user_message == "quickreply":
        quick_reply = QuickReply(
            items=[
                QuickReplyItem(action=MessageAction(label="Yes", text="Yes")),
                QuickReplyItem(action=MessageAction(label="No", text="No"))
            ]
        )
        reply_message = TextMessage(text="เลือกคำตอบ", quick_reply=quick_reply)

    elif user_message == "carousel":
        carousel_template = CarouselTemplate(
            columns=[
                CarouselColumn(text="Option 1", actions=[MessageAction(label="Select 1", text="Option 1 selected")]),
                CarouselColumn(text="Option 2", actions=[MessageAction(label="Select 2", text="Option 2 selected")])
            ]
        )
        reply_message = TemplateMessage(alt_text="Carousel Template", template=carousel_template)

    else:
        reply_message = TextMessage(text=f"You said: {user_message}")

    line_bot_api.reply_message(
        ReplyMessageRequest(reply_token=event.reply_token, messages=[reply_message])
    )

if __name__ == "__main__":
    app.run(port=5000)
