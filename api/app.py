import telebot
import yt_dlp

BOT_TOKEN = "YOUR_BOT_TOKEN"
bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(message, "⚡ Allify Tools Bot\n\nSend YouTube link to download 📥")

@bot.message_handler(func=lambda m: True)
def download(message):
    url = message.text

    if "youtube" in url:
        bot.reply_to(message, "⏳ Downloading...")

        ydl_opts = {
            'format': 'best',
            'outtmpl': 'video.mp4'
        }

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])

            video = open("video.mp4", "rb")
            bot.send_video(message.chat.id, video)

        except:
            bot.reply_to(message, "❌ Error downloading video")

bot.polling()
