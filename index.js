const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// START MENU
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "⚡ Allify Tools Bot\n\nChoose option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📥 Download Tools", callback_data: "download" }],
        [{ text: "🤖 AI Tools", callback_data: "ai" }]
      ]
    }
  });
});

// BUTTON HANDLER
bot.on('callback_query', (query) => {
  const msg = query.message;

  if (query.data === "download") {
    bot.sendMessage(msg.chat.id, "📥 Send YouTube link");
  }

  if (query.data === "ai") {
    bot.sendMessage(msg.chat.id, "🤖 AI coming soon...");
  }

  bot.answerCallbackQuery(query.id);
});

// DOWNLOAD LOGIC
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (ytdl.validateURL(text)) {
    bot.sendMessage(chatId, "⏳ Downloading...");

    try {
      const info = await ytdl.getInfo(text);
      const title = info.videoDetails.title;

      bot.sendMessage(chatId, `📥 Sending: ${title}`);

      bot.sendVideo(chatId, ytdl(text, { quality: '18' }));
    } catch (err) {
      bot.sendMessage(chatId, "❌ Error downloading video");
    }
  }
});
