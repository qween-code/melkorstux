/**
 * REST API Routes
 */
import { Router } from 'express';
import { Jobs, Posts, Clicks, Revenue, Platforms, Communities, Competitors, Metrics, Settings } from '../models/index.js';
import { render, availableTemplates } from '../templates/engine.js';
import { buildRefUrl, buildAllRefUrls } from '../services/referral.js';
import { postJobToChannel } from '../bots/telegram.js';
import { postViaWebhook } from '../bots/discord.js';

const router = Router();

// ─── JOBS ─────────────────────────────────────────────────

router.get('/jobs', (req, res) => {
  const jobs = Jobs.list(req.query);
  res.json({ ok: true, data: jobs, count: jobs.length });
});

router.get('/jobs/stats', (req, res) => {
  res.json({ ok: true, data: Jobs.stats() });
});

router.get('/jobs/:id', (req, res) => {
  const job = Jobs.get(req.params.id);
  if (!job) return res.status(404).json({ ok: false, error: 'Job not found' });

  // Also include click count
  job._clicks = Clicks.forJob(job.id);
  res.json({ ok: true, data: job });
});

router.post('/jobs', (req, res) => {
  try {
    // Auto-generate referral URL if not provided
    if (!req.body.ref_url && req.body.apply_url && req.body.platform_id) {
      req.body.ref_url = buildRefUrl(req.body.platform_id, req.body.apply_url, 'direct');
    }
    const job = Jobs.create(req.body);
    res.status(201).json({ ok: true, data: job });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

router.put('/jobs/:id', (req, res) => {
  const job = Jobs.update(req.params.id, req.body);
  if (!job) return res.status(404).json({ ok: false, error: 'Job not found' });
  res.json({ ok: true, data: job });
});

router.delete('/jobs/:id', (req, res) => {
  Jobs.delete(req.params.id);
  res.json({ ok: true });
});

// ─── CLICK TRACKING ───────────────────────────────────────

// Redirect endpoint: /api/go/:jobId?ch=telegram
router.get('/go/:jobId', (req, res) => {
  const job = Jobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ ok: false, error: 'Job not found' });

  Clicks.track(job.id, req.query.ch || 'direct', {
    ip: req.ip,
    ua: req.headers['user-agent'],
    referer: req.headers.referer
  });

  const target = job.ref_url || job.apply_url;
  res.redirect(302, target);
});

router.get('/clicks/stats', (req, res) => {
  const days = parseInt(req.query.days) || 30;
  res.json({ ok: true, data: Clicks.stats(days) });
});

// ─── CONTENT GENERATION ───────────────────────────────────

router.post('/content/generate', (req, res) => {
  const { job_id, channel, template } = req.body;
  const job = Jobs.get(job_id);
  if (!job) return res.status(404).json({ ok: false, error: 'Job not found' });

  try {
    const content = render(channel, template || 'single_tr', job);
    res.json({ ok: true, data: { channel, template: template || 'single_tr', content } });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

router.get('/content/templates', (req, res) => {
  res.json({ ok: true, data: availableTemplates() });
});

// ─── POSTING ──────────────────────────────────────────────

router.post('/post/telegram', async (req, res) => {
  const { job_id, lang } = req.body;
  const job = Jobs.get(job_id);
  if (!job) return res.status(404).json({ ok: false, error: 'Job not found' });

  try {
    const result = await postJobToChannel(job, lang || 'tr');
    res.json({ ok: true, data: result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.post('/post/discord', async (req, res) => {
  const { job_id } = req.body;
  const job = Jobs.get(job_id);
  if (!job) return res.status(404).json({ ok: false, error: 'Job not found' });

  try {
    const result = await postViaWebhook(job);
    res.json({ ok: true, data: result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── POSTS HISTORY ────────────────────────────────────────

router.get('/posts', (req, res) => {
  const posts = Posts.list(req.query);
  res.json({ ok: true, data: posts, count: posts.length });
});

router.get('/posts/stats', (req, res) => {
  res.json({ ok: true, data: Posts.stats() });
});

// ─── REVENUE ──────────────────────────────────────────────

router.get('/revenue', (req, res) => {
  res.json({ ok: true, data: Revenue.list() });
});

router.get('/revenue/stats', (req, res) => {
  res.json({ ok: true, data: Revenue.stats() });
});

router.post('/revenue', (req, res) => {
  try {
    const rev = Revenue.create(req.body);
    res.status(201).json({ ok: true, data: rev });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

router.post('/revenue/:id/paid', (req, res) => {
  Revenue.markPaid(req.params.id);
  res.json({ ok: true });
});

// ─── PLATFORMS ─────────────────────────────────────────────

router.get('/platforms', (req, res) => {
  res.json({ ok: true, data: Platforms.list() });
});

// ─── COMMUNITIES ──────────────────────────────────────────

router.get('/communities', (req, res) => {
  const communities = Communities.list(req.query);
  res.json({ ok: true, data: communities, count: communities.length });
});

// ─── COMPETITORS ──────────────────────────────────────────

router.get('/competitors', (req, res) => {
  const competitors = Competitors.list();
  res.json({ ok: true, data: competitors });
});

router.post('/competitors', (req, res) => {
  try {
    const comp = Competitors.create(req.body);
    res.status(201).json({ ok: true, data: comp });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// ─── ANALYTICS / DASHBOARD ───────────────────────────────

router.get('/dashboard', (req, res) => {
  res.json({
    ok: true,
    data: {
      jobs: Jobs.stats(),
      posts: Posts.stats(),
      clicks: Clicks.stats(30),
      revenue: Revenue.stats(),
    }
  });
});

router.get('/metrics', (req, res) => {
  const days = parseInt(req.query.days) || 30;
  res.json({ ok: true, data: { daily: Metrics.daily(days), summary: Metrics.summary(days) } });
});

// ─── SETTINGS ─────────────────────────────────────────────

router.get('/settings', (req, res) => {
  res.json({ ok: true, data: Settings.all() });
});

router.put('/settings/:key', (req, res) => {
  Settings.set(req.params.key, req.body.value);
  res.json({ ok: true });
});

// ─── REFERRAL LINKS ───────────────────────────────────────

router.post('/referral/generate', (req, res) => {
  const { platform_id, apply_url } = req.body;
  if (!platform_id || !apply_url) {
    return res.status(400).json({ ok: false, error: 'platform_id and apply_url required' });
  }
  const urls = buildAllRefUrls(platform_id, apply_url);
  res.json({ ok: true, data: urls });
});

export default router;
