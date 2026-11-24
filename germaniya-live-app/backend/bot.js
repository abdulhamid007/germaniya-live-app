const { Bot, InlineKeyboard } = require('grammy');

function initBot() {
  const token = process.env.BOT_TOKEN;
  const webAppUrl = process.env.WEBAPP_URL;

  if (!token || token.includes('SIZNING_TELEGRAM_BOT_TOKENINGIZ')) {
    console.log('⚠️ BOT_TOKEN kiritilmagan. Telegram bot hozircha o\'chiq (API server ishlayapti).');
    return null;
  }

  const bot = new Bot(token);

  bot.command('start', async (ctx) => {
    const firstName = ctx.from?.first_name || 'Do\'stim';
    const keyboard = new InlineKeyboard();

    if (webAppUrl && webAppUrl.startsWith('https://')) {
      keyboard.webApp('🇩🇪 Germaniya Live Ilovasini Ochish', webAppUrl);
    }

    await ctx.reply(
      `Salom, ${firstName}! 🇩🇪\n\n` +
      `**Germaniya Live** — nemis tilida ko'chada intervyu berish, do'konda gaplashish, yangiliklar eshitish va AI bilan jonli suhbatlashish ilovasiga xush kelibsiz!\n\n` +
      `👇 Quyidagi tugmani bosib ilovani oching:`,
      {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      }
    );
  });

  bot.command('stats', async (ctx) => {
    const { getUser } = require('./database');
    const user = getUser(ctx.from.id);
    await ctx.reply(
      `📊 **Sizning natijalaringiz:**\n` +
      `⚡ XP ball: **${user.xp}**\n` +
      `🎬 Tugatilgan sahnalar: **${user.completedScenes.length}**\n` +
      `💬 O'rganilgan iboralar: **${user.learnedPhrases.length}**`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.catch((err) => {
    console.error('Telegram Bot xatosi:', err);
  });

  bot.start();
  console.log('🤖 Telegram Bot muvaffaqiyatli ishga tushdi!');
  return bot;
}

module.exports = { initBot };
