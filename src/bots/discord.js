#!/usr/bin/env node
/**
 * Discord Bot - posts jobs via webhook or bot
 *
 * Setup Option A (Webhook - Easiest):
 * 1. Server Settings > Integrations > Webhooks > New Webhook
 * 2. Copy URL, set DISCORD_WEBHOOK_URL in .env
 *
 * Setup Option B (Full Bot):
 * 1. Go to discord.com/developers, create app, add bot
 * 2. Get token, set DISCORD_BOT_TOKEN in .env
 * 3. Invite bot to server with message permissions
 */
import 'dotenv/config';
import axios from 'axios';
import { Jobs, Posts } from '../models/index.js';
import { render } from '../templates/engine.js';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

/**
 * Post job via Discord Webhook (simplest method)
 */
export async function postViaWebhook(job) {
  if (!WEBHOOK_URL) {
    console.error('❌ DISCORD_WEBHOOK_URL not set');
    return null;
  }

  const embed = render('discord', 'embed', job);

  const post = Posts.create({
    job_id: job.id,
    channel: 'discord',
    message: `[embed] ${job.title}`,
    status: 'draft'
  });

  try {
    const res = await axios.post(WEBHOOK_URL, {
      username: 'Talent Bridge',
      avatar_url: 'https://cdn-icons-png.flaticon.com/512/2942/2942821.png',
      ...embed
    });

    Posts.markSent(post.id, '', '');
    console.log(`✅ Discord: Posted "${job.title}" via webhook`);
    return res.data;
  } catch (err) {
    const errMsg = err.response?.data?.message || err.message;
    Posts.markFailed(post.id, errMsg);
    console.error(`❌ Discord webhook failed: ${errMsg}`);
    return null;
  }
}

/**
 * Post plain text via webhook
 */
export async function postTextViaWebhook(text) {
  if (!WEBHOOK_URL) return null;

  try {
    await axios.post(WEBHOOK_URL, {
      username: 'Talent Bridge',
      content: text
    });
    return true;
  } catch (err) {
    console.error(`❌ Discord text post failed: ${err.message}`);
    return null;
  }
}

/**
 * Post daily jobs to Discord
 */
export async function postDailyJobs() {
  const jobs = Jobs.unposted('discord').slice(0, 3);
  if (jobs.length === 0) {
    console.log('ℹ️  No unposted jobs for Discord');
    return;
  }

  for (const job of jobs) {
    await postViaWebhook(job);
    // Rate limit: wait 2 seconds between posts
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`✅ Discord: ${jobs.length} jobs posted`);
}

// ─── STANDALONE MODE ──────────────────────────────────────

if (process.argv[1]?.endsWith('discord.js')) {
  console.log('🤖 Discord bot starting...');

  if (WEBHOOK_URL) {
    console.log('   Mode: Webhook');
    console.log('   Ready to receive post commands via API');
  } else {
    console.log('❌ No DISCORD_WEBHOOK_URL configured. Set it in .env');
  }

  // Just post daily jobs and exit when run directly
  postDailyJobs().then(() => {
    console.log('✅ Done');
    process.exit(0);
  });
}

export default { postViaWebhook, postTextViaWebhook, postDailyJobs };
