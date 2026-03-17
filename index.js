const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// START MENU WITH BUTTONS
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "⚡ Allify Tools Bot\n\nChoose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📥 Download Tools", callback_data: "download" }],
        [{ text: "🤖 AI Tools", callback_data: "ai" }]
      ]
    }
  });
});

// BUTTON CLICK HANDLER
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "download") {
    bot.sendMessage(chatId, "📥 Send YouTube link");
  }

  if (query.data === "ai") {
    bot.sendMessage(chatId, "🤖 AI coming soon...");
  }

  bot.answerCallbackQuery(query.id);
});

// MESSAGE HANDLER (DOWNLOAD LOGIC)
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore /start command
  if (text === "/start") return;

  // Check if message is YouTube link
  if (text && text.includes("youtube")) {
    bot.sendMessage(chatId, "⏳ Processing your download...");

    try {
      const res = await axios.post("https://allify-api.onrender.com/download", {
        url: text
      });

      if (res.data.status === "success") {
        bot.sendMessage(chatId, "✅ Video downloaded successfully (server side)");
      } else {
        bot.sendMessage(chatId, "❌ Download failed");
      }

    } catch (error) {
      bot.sendMessage(chatId, "⚠️ Error connecting to server");
    }
  }
});
