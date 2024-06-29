const TOKEN = '7484224847:AAHve7fZkRutXKixSnY0gTzlm6SoC8klZN0'
const { Telegraf } = require("telegraf")
const bot = new Telegraf(TOKEN)
const web_link = "https://fanciful-treacle-b8d943.netlify.app/"

bot.start((ctx) => ctx.reply('Welcome'
    , {reply_markup: {keyboard: [[{text: "Weather", web_app: {url:web_link}}]]}}
))
bot.launch()