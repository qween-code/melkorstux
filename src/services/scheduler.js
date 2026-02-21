#!/usr/bin/env node
/**
 * Cron Scheduler - automated posting and metrics collection
 *
 * Runs daily tasks:
 * - Post unposted jobs to Telegram channel
 * - Post unposted jobs to Discord
 * - Collect daily metrics snapshot
 *
 * Usage: npm run cron
 */
import 'dotenv/config';
import cron from 'node-cron';
import { Jobs, Posts, Clicks, Metrics, Settings } from '../models/index.js';
import { postJobToChannel, postDailyList } from '../bots/telegram.js';
import { postDailyJobs as postDiscordDaily } from '../bots/discord.js';

const autoPost = Settings.get('auto_post') === 'true';

console.log('⏰ Scheduler starting...');
console.log(`   Auto-post: ${autoPost ? 'ENABLED' : 'DISABLED'}`);

// ─── MORNING POST (09:00 Istanbul time) ───────────────────
cron.schedule('0 9 * * *', async () => {
  console.log('🌅 Morning post job running...');

  if (!autoPost) {
    console.log('   Skipped (auto_post disabled)');
    return;
  }

  try {
    // Post top priority unposted job to Telegram
    const telegramJobs = Jobs.unposted('telegram');
    if (telegramJobs.length > 0) {
      await postJobToChannel(telegramJobs[0], 'tr');
    }

    // Post to Discord
    const discordJobs = Jobs.unposted('discord');
    if (discordJobs.length > 0) {
      const { postViaWebhook } = await import('../bots/discord.js');
      await postViaWebhook(discordJobs[0]);
    }
  } catch (err) {
    console.error('❌ Morning post failed:', err.message);
  }
}, { timezone: 'Europe/Istanbul' });

// ─── AFTERNOON LIST (14:00 Istanbul time) ─────────────────
cron.schedule('0 14 * * *', async () => {
  console.log('🌞 Afternoon list running...');

  if (!autoPost) return;

  try {
    await postDailyList();
  } catch (err) {
    console.error('❌ Afternoon list failed:', err.message);
  }
}, { timezone: 'Europe/Istanbul' });

// ─── EVENING DISCORD (18:00 Istanbul time) ────────────────
cron.schedule('0 18 * * *', async () => {
  console.log('🌆 Evening Discord post...');

  if (!autoPost) return;

  try {
    await postDiscordDaily();
  } catch (err) {
    console.error('❌ Evening Discord failed:', err.message);
  }
}, { timezone: 'Europe/Istanbul' });

// ─── DAILY METRICS SNAPSHOT (23:55) ───────────────────────
cron.schedule('55 23 * * *', () => {
  console.log('📊 Daily metrics snapshot...');

  try {
    const postStats = Posts.stats();
    const clickStats = Clicks.stats(1);

    // Record metrics for each channel
    const channels = ['telegram', 'discord', 'twitter', 'linkedin', 'reddit'];
    for (const ch of channels) {
      const chPosts = postStats.byChannel?.find(c => c.channel === ch)?.c || 0;
      const chClicks = clickStats.byChannel?.find(c => c.channel === ch)?.c || 0;

      Metrics.record(ch, {
        posts: chPosts,
        clicks: chClicks,
      });
    }

    console.log('✅ Metrics snapshot saved');
  } catch (err) {
    console.error('❌ Metrics snapshot failed:', err.message);
  }
}, { timezone: 'Europe/Istanbul' });

// ─── EXPIRE OLD JOBS (Daily at 00:30) ─────────────────────
cron.schedule('30 0 * * *', () => {
  console.log('🗑️  Checking expired jobs...');

  try {
    const result = db.prepare(`
      UPDATE jobs SET status = 'expired'
      WHERE status = 'active' AND expires_at IS NOT NULL AND expires_at < datetime('now')
    `).run();

    if (result.changes > 0) {
      console.log(`   Expired ${result.changes} job(s)`);
    }
  } catch (err) {
    console.error('❌ Job expiry check failed:', err.message);
  }
}, { timezone: 'Europe/Istanbul' });

console.log('✅ Scheduler running. Waiting for scheduled times...');
console.log('   09:00 - Morning job post');
console.log('   14:00 - Afternoon job list');
console.log('   18:00 - Evening Discord post');
console.log('   23:55 - Daily metrics snapshot');

// Keep process alive
process.on('SIGINT', () => { console.log('Scheduler stopped'); process.exit(0); });
