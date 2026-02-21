/**
 * Data Access Layer - all database operations in one place
 */
import db from '../db/database.js';
import { nanoid } from 'nanoid';

// ─── JOBS ─────────────────────────────────────────────────

export const Jobs = {
  create(data) {
    const id = nanoid(12);
    const techStack = JSON.stringify(data.tech_stack || []);
    const reqs = JSON.stringify(data.requirements || []);
    const bens = JSON.stringify(data.benefits || []);

    db.prepare(`
      INSERT INTO jobs (id, platform_id, title, company, description,
        salary_min, salary_max, salary_currency, salary_period,
        location, remote_type, job_type, experience,
        tech_stack, requirements, benefits,
        apply_url, ref_url, priority, status, expires_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `).run(
      id, data.platform_id || 'mercor', data.title, data.company, data.description || '',
      data.salary_min || null, data.salary_max || null, data.salary_currency || 'USD', data.salary_period || 'hour',
      data.location || 'Remote', data.remote_type || 'worldwide', data.job_type || 'fulltime',
      data.experience || 'mid', techStack, reqs, bens,
      data.apply_url, data.ref_url || '', data.priority || 0, data.status || 'active',
      data.expires_at || null
    );
    return this.get(id);
  },

  get(id) {
    const row = db.prepare('SELECT j.*, p.name as platform_name FROM jobs j JOIN platforms p ON j.platform_id = p.id WHERE j.id = ?').get(id);
    return row ? parseJsonFields(row) : null;
  },

  list(filters = {}) {
    let where = ['1=1'];
    let params = [];

    if (filters.status) { where.push('j.status = ?'); params.push(filters.status); }
    if (filters.platform_id) { where.push('j.platform_id = ?'); params.push(filters.platform_id); }
    if (filters.experience) { where.push('j.experience = ?'); params.push(filters.experience); }
    if (filters.search) { where.push('(j.title LIKE ? OR j.company LIKE ?)'); params.push(`%${filters.search}%`, `%${filters.search}%`); }
    if (filters.min_salary) { where.push('j.salary_min >= ?'); params.push(filters.min_salary); }

    const limit = filters.limit || 50;
    const offset = filters.offset || 0;

    const rows = db.prepare(`
      SELECT j.*, p.name as platform_name
      FROM jobs j JOIN platforms p ON j.platform_id = p.id
      WHERE ${where.join(' AND ')}
      ORDER BY j.priority DESC, j.posted_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    return rows.map(parseJsonFields);
  },

  update(id, data) {
    const allowed = ['title','company','description','salary_min','salary_max','salary_currency',
      'salary_period','location','remote_type','job_type','experience','tech_stack',
      'requirements','benefits','apply_url','ref_url','priority','status','expires_at'];

    const sets = [];
    const vals = [];
    for (const [k, v] of Object.entries(data)) {
      if (!allowed.includes(k)) continue;
      sets.push(`${k} = ?`);
      vals.push(['tech_stack','requirements','benefits'].includes(k) ? JSON.stringify(v) : v);
    }
    if (sets.length === 0) return this.get(id);

    sets.push("updated_at = datetime('now')");
    vals.push(id);
    db.prepare(`UPDATE jobs SET ${sets.join(', ')} WHERE id = ?`).run(...vals);
    return this.get(id);
  },

  delete(id) { db.prepare("UPDATE jobs SET status = 'expired' WHERE id = ?").run(id); },

  stats() {
    return {
      total: db.prepare('SELECT COUNT(*) as c FROM jobs').get().c,
      active: db.prepare("SELECT COUNT(*) as c FROM jobs WHERE status = 'active'").get().c,
      filled: db.prepare("SELECT COUNT(*) as c FROM jobs WHERE status = 'filled'").get().c,
      byPlatform: db.prepare("SELECT platform_id, COUNT(*) as c FROM jobs GROUP BY platform_id").all(),
      byExperience: db.prepare("SELECT experience, COUNT(*) as c FROM jobs WHERE status='active' GROUP BY experience").all(),
    };
  },

  active() { return this.list({ status: 'active' }); },
  unposted(channel) {
    return db.prepare(`
      SELECT j.*, p.name as platform_name FROM jobs j
      JOIN platforms p ON j.platform_id = p.id
      WHERE j.status = 'active'
      AND j.id NOT IN (SELECT job_id FROM posts WHERE channel = ? AND status = 'sent' AND job_id IS NOT NULL)
      ORDER BY j.priority DESC, j.posted_at DESC
    `).all(channel).map(parseJsonFields);
  }
};

// ─── POSTS ────────────────────────────────────────────────

export const Posts = {
  create(data) {
    const id = nanoid(12);
    db.prepare(`
      INSERT INTO posts (id, job_id, channel, message, status, scheduled)
      VALUES (?,?,?,?,?,?)
    `).run(id, data.job_id || null, data.channel, data.message, data.status || 'draft', data.scheduled || null);
    return this.get(id);
  },

  get(id) { return db.prepare('SELECT * FROM posts WHERE id = ?').get(id); },

  markSent(id, extId = '', postUrl = '') {
    db.prepare(`
      UPDATE posts SET status = 'sent', sent_at = datetime('now'), post_ext_id = ?, post_url = ? WHERE id = ?
    `).run(extId, postUrl, id);
  },

  markFailed(id, error) {
    db.prepare("UPDATE posts SET status = 'failed', error = ? WHERE id = ?").run(error, id);
  },

  list(filters = {}) {
    let where = ['1=1'];
    let params = [];
    if (filters.channel) { where.push('channel = ?'); params.push(filters.channel); }
    if (filters.status) { where.push('status = ?'); params.push(filters.status); }
    if (filters.job_id) { where.push('job_id = ?'); params.push(filters.job_id); }
    return db.prepare(`SELECT * FROM posts WHERE ${where.join(' AND ')} ORDER BY created_at DESC LIMIT 100`).all(...params);
  },

  stats() {
    return {
      total: db.prepare('SELECT COUNT(*) as c FROM posts').get().c,
      sent: db.prepare("SELECT COUNT(*) as c FROM posts WHERE status = 'sent'").get().c,
      byChannel: db.prepare("SELECT channel, COUNT(*) as c FROM posts WHERE status = 'sent' GROUP BY channel").all(),
      today: db.prepare("SELECT COUNT(*) as c FROM posts WHERE status = 'sent' AND date(sent_at) = date('now')").get().c,
    };
  }
};

// ─── CLICKS ───────────────────────────────────────────────

export const Clicks = {
  track(jobId, channel = 'direct', meta = {}) {
    db.prepare('INSERT INTO clicks (job_id, channel, ip, ua, referer) VALUES (?,?,?,?,?)')
      .run(jobId, channel, meta.ip || '', meta.ua || '', meta.referer || '');
  },

  forJob(jobId) {
    return db.prepare('SELECT COUNT(*) as c FROM clicks WHERE job_id = ?').get(jobId).c;
  },

  stats(days = 30) {
    return {
      total: db.prepare(`SELECT COUNT(*) as c FROM clicks WHERE created_at >= datetime('now', '-${days} days')`).get().c,
      byChannel: db.prepare(`SELECT channel, COUNT(*) as c FROM clicks WHERE created_at >= datetime('now', '-${days} days') GROUP BY channel`).all(),
      byDay: db.prepare(`SELECT date(created_at) as day, COUNT(*) as c FROM clicks WHERE created_at >= datetime('now', '-${days} days') GROUP BY day ORDER BY day`).all(),
      topJobs: db.prepare(`
        SELECT j.id, j.title, j.company, COUNT(c.id) as clicks
        FROM clicks c JOIN jobs j ON c.job_id = j.id
        WHERE c.created_at >= datetime('now', '-${days} days')
        GROUP BY j.id ORDER BY clicks DESC LIMIT 10
      `).all(),
    };
  }
};

// ─── REVENUE ──────────────────────────────────────────────

export const Revenue = {
  create(data) {
    const id = nanoid(12);
    db.prepare(`
      INSERT INTO revenue (id, job_id, platform_id, candidate, amount, currency, status, notes)
      VALUES (?,?,?,?,?,?,?,?)
    `).run(id, data.job_id || null, data.platform_id, data.candidate || '', data.amount, data.currency || 'USD', data.status || 'pending', data.notes || '');
    return db.prepare('SELECT * FROM revenue WHERE id = ?').get(id);
  },

  list() { return db.prepare('SELECT r.*, p.name as platform_name FROM revenue r JOIN platforms p ON r.platform_id = p.id ORDER BY created_at DESC').all(); },

  markPaid(id) { db.prepare("UPDATE revenue SET status = 'paid', paid_at = datetime('now') WHERE id = ?").run(id); },

  stats() {
    const rows = db.prepare('SELECT * FROM revenue').all();
    let total = 0, paid = 0, pending = 0;
    for (const r of rows) {
      total += r.amount;
      if (r.status === 'paid') paid += r.amount;
      if (r.status === 'pending' || r.status === 'confirmed') pending += r.amount;
    }
    return { total: +total.toFixed(2), paid: +paid.toFixed(2), pending: +pending.toFixed(2), count: rows.length };
  }
};

// ─── PLATFORMS ─────────────────────────────────────────────

export const Platforms = {
  list() { return db.prepare('SELECT * FROM platforms ORDER BY name').all(); },
  get(id) { return db.prepare('SELECT * FROM platforms WHERE id = ?').get(id); },
  updateRefCode(id, code) { db.prepare('UPDATE ref_code = ? WHERE id = ?').run(code, id); },
};

// ─── COMMUNITIES ──────────────────────────────────────────

export const Communities = {
  list(filters = {}) {
    let where = ['1=1'];
    let params = [];
    if (filters.channel) { where.push('channel = ?'); params.push(filters.channel); }
    if (filters.status) { where.push('status = ?'); params.push(filters.status); }
    if (filters.language) { where.push('language = ?'); params.push(filters.language); }
    return db.prepare(`SELECT * FROM communities WHERE ${where.join(' AND ')} ORDER BY members DESC`).all(...params);
  },
  get(id) { return db.prepare('SELECT * FROM communities WHERE id = ?').get(id); },
  updateLastPost(id) { db.prepare("UPDATE communities SET last_post = datetime('now') WHERE id = ?").run(id); }
};

// ─── COMPETITORS ──────────────────────────────────────────

export const Competitors = {
  list() { return db.prepare('SELECT * FROM competitors ORDER BY type, name').all(); },
  get(id) { return db.prepare('SELECT * FROM competitors WHERE id = ?').get(id); },
  create(data) {
    const id = nanoid(8);
    db.prepare(`INSERT INTO competitors (id, name, url, type, channels, strengths, weaknesses, audience, pricing, notes)
      VALUES (?,?,?,?,?,?,?,?,?,?)`).run(
      id, data.name, data.url, data.type || 'direct',
      JSON.stringify(data.channels || []),
      data.strengths || '', data.weaknesses || '', data.audience || '', data.pricing || '', data.notes || ''
    );
    return this.get(id);
  }
};

// ─── METRICS ──────────────────────────────────────────────

export const Metrics = {
  record(channel, data) {
    const date = new Date().toISOString().slice(0, 10);
    db.prepare(`
      INSERT INTO metrics (date, channel, followers, posts, clicks, applies, revenue)
      VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(date, channel) DO UPDATE SET
        followers = excluded.followers,
        posts = excluded.posts,
        clicks = excluded.clicks,
        applies = excluded.applies,
        revenue = excluded.revenue
    `).run(date, channel, data.followers || 0, data.posts || 0, data.clicks || 0, data.applies || 0, data.revenue || 0);
  },

  daily(days = 30) {
    return db.prepare(`SELECT * FROM metrics WHERE date >= date('now', '-${days} days') ORDER BY date DESC, channel`).all();
  },

  summary(days = 30) {
    return db.prepare(`
      SELECT channel, SUM(clicks) as clicks, SUM(posts) as posts, SUM(applies) as applies, SUM(revenue) as revenue
      FROM metrics WHERE date >= date('now', '-${days} days')
      GROUP BY channel
    `).all();
  }
};

// ─── SETTINGS ─────────────────────────────────────────────

export const Settings = {
  get(key) { const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key); return row?.value; },
  set(key, value) { db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, String(value)); },
  all() {
    const rows = db.prepare('SELECT * FROM settings').all();
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  }
};

// ─── HELPERS ──────────────────────────────────────────────

function parseJsonFields(row) {
  if (!row) return null;
  for (const f of ['tech_stack', 'requirements', 'benefits', 'channels']) {
    if (row[f] && typeof row[f] === 'string') {
      try { row[f] = JSON.parse(row[f]); } catch { row[f] = []; }
    }
  }
  return row;
}
