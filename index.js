const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `
⚡ Welcome to Allify Tools Bot

Choose option:
1. Download Tools
2. File Converter
3. Image Tools
4. AI Tools
  `);
});

bot.on('message', (msg) => {
  if (msg.text === "1") {
    bot.sendMessage(msg.chat.id, "Send video link 📥");
  }
});
