#!/usr/bin/env node
/**
 * Telegram Bot - posts jobs to channel and handles commands
 *
 * Setup:
 * 1. Message @BotFather on Telegram, create bot, get token
 * 2. Create a channel, add bot as admin
 * 3. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID in .env
 * 4. Run: npm run bot:telegram
 */
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { Jobs, Posts, Clicks } from '../models/index.js';
import { render } from '../templates/engine.js';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL = process.env.TELEGRAM_CHANNEL_ID;

// Create bot only if token is available (allows importing without crashing the server)
const bot = TOKEN ? new Telegraf(TOKEN) : null;

if (!TOKEN) {
  console.warn('⚠️  TELEGRAM_BOT_TOKEN not set. Telegram features disabled. See .env.example');
}

// ─── BOT COMMANDS (for DM interactions) ───────────────────

if (bot) {
  bot.command('start', (ctx) => {
    ctx.reply(
      `🚀 *Talent Bridge Bot*\n\n` +
      `Remote iş fırsatlarını takip et!\n\n` +
      `Komutlar:\n` +
      `/jobs — Aktif işler\n` +
      `/top — En popüler işler\n` +
      `/help — Yardım\n`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.command('jobs', (ctx) => {
    const jobs = Jobs.active().slice(0, 5);
    if (jobs.length === 0) {
      return ctx.reply('Şu an aktif iş yok. Yakında yeni fırsatlar eklenecek!');
    }
    const msg = render('telegram', 'list_tr', jobs);
    ctx.reply(msg, { parse_mode: 'Markdown', disable_web_page_preview: true });
  });

  bot.command('top', (ctx) => {
    const clickStats = Clicks.stats(30);
    if (!clickStats.topJobs?.length) {
      return ctx.reply('Henüz yeterli veri yok.');
    }
    let msg = '🏆 *En Popüler İşler (30 gün)*\n\n';
    clickStats.topJobs.slice(0, 5).forEach((j, i) => {
      msg += `${i + 1}. *${j.title}* — ${j.company} (${j.clicks} tıklama)\n`;
    });
    ctx.reply(msg, { parse_mode: 'Markdown' });
  });

  bot.command('help', (ctx) => {
    ctx.reply(
      `📖 *Talent Bridge Yardım*\n\n` +
      `Bu bot, uzaktan çalışma fırsatlarını paylaşır.\n\n` +
      `📩 İş göndermek için: @TurhanHamza\n` +
      `🌐 Web: talent-bridge.com\n\n` +
      `Komutlar:\n` +
      `/jobs — Güncel işler\n` +
      `/top — En popüler\n`,
      { parse_mode: 'Markdown' }
    );
  });
}

// ─── CHANNEL POSTING FUNCTIONS ────────────────────────────

/**
 * Post a single job to channel
 */
export async function postJobToChannel(job, lang = 'tr') {
  if (!bot) {
    console.warn('⚠️  Telegram bot not configured. Skipping post.');
    return null;
  }
  if (!CHANNEL) {
    console.error('❌ TELEGRAM_CHANNEL_ID not set');
    return null;
  }

  const templateName = lang === 'tr' ? 'single_tr' : 'single_en';
  const message = render('telegram', templateName, job);

  // Save post record
  const post = Posts.create({
    job_id: job.id,
    channel: 'telegram',
    message: message,
    status: 'draft'
  });

  try {
    const result = await bot.telegram.sendMessage(CHANNEL, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: false
    });

    Posts.markSent(post.id, String(result.message_id), '');
    console.log(`✅ Telegram: Posted job "${job.title}" (msg: ${result.message_id})`);
    return result;
  } catch (err) {
    Posts.markFailed(post.id, err.message);
    console.error(`❌ Telegram post failed: ${err.message}`);
    return null;
  }
}

/**
 * Post daily job list to channel
 */
export async function postDailyList() {
  if (!bot || !CHANNEL) return null;

  const jobs = Jobs.unposted('telegram').slice(0, 5);
  if (jobs.length === 0) {
    console.log('ℹ️  No unposted jobs for Telegram');
    return null;
  }

  const message = render('telegram', 'list_tr', jobs);

  try {
    const result = await bot.telegram.sendMessage(CHANNEL, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });

    // Record posts for each job
    for (const job of jobs) {
      const post = Posts.create({ job_id: job.id, channel: 'telegram', message: `[list] ${job.title}`, status: 'sent' });
      Posts.markSent(post.id, String(result.message_id), '');
    }

    console.log(`✅ Telegram: Daily list posted (${jobs.length} jobs)`);
    return result;
  } catch (err) {
    console.error(`❌ Telegram daily list failed: ${err.message}`);
    return null;
  }
}

// ─── STANDALONE MODE ──────────────────────────────────────

if (process.argv[1]?.endsWith('telegram.js')) {
  if (!bot) {
    console.error('❌ TELEGRAM_BOT_TOKEN not set. Cannot start bot. See .env.example');
    process.exit(1);
  }

  console.log('🤖 Telegram bot starting...');
  console.log(`   Channel: ${CHANNEL || 'NOT SET'}`);

  bot.launch()
    .then(() => console.log('✅ Telegram bot is running'))
    .catch(err => console.error('❌ Bot failed:', err.message));

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export { bot };
export default { bot, postJobToChannel, postDailyList };
