const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// START COMMAND WITH BUTTONS
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "⚡ Welcome to Allify Tools Bot\n\nChoose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📥 Download Tools", callback_data: "download" }],
        [{ text: "📂 File Converter", callback_data: "converter" }],
        [{ text: "🖼️ Image Tools", callback_data: "image" }],
        [{ text: "🤖 AI Tools", callback_data: "ai" }]
      ]
    }
  });
});

// BUTTON CLICK HANDLER
bot.on('callback_query', (query) => {
  const msg = query.message;

  if (query.data === "download") {
    bot.sendMessage(msg.chat.id, "📥 Send video link to download");
  }

  if (query.data === "converter") {
    bot.sendMessage(msg.chat.id, "📂 Send file to convert");
  }

  if (query.data === "image") {
    bot.sendMessage(msg.chat.id, "🖼️ Send image for editing");
  }

  if (query.data === "ai") {
    bot.sendMessage(msg.chat.id, "🤖 Ask anything...");
  }

  bot.answerCallbackQuery(query.id);
});
