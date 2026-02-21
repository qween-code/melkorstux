#!/usr/bin/env node
/**
 * Database initialization - creates all tables, indexes, and default data
 */
import db from './database.js';

console.log('🔧 Initializing database...\n');

// ─── TABLES ───────────────────────────────────────────────

db.exec(`
  -- Platform referral configurations
  CREATE TABLE IF NOT EXISTS platforms (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    base_url    TEXT NOT NULL,
    ref_code    TEXT DEFAULT '',
    ref_url_tpl TEXT DEFAULT '',
    commission  TEXT DEFAULT '',
    status      TEXT DEFAULT 'active' CHECK(status IN ('active','paused','inactive')),
    notes       TEXT DEFAULT '',
    created_at  TEXT DEFAULT (datetime('now'))
  );

  -- Job listings
  CREATE TABLE IF NOT EXISTS jobs (
    id              TEXT PRIMARY KEY,
    platform_id     TEXT NOT NULL,
    title           TEXT NOT NULL,
    company         TEXT NOT NULL,
    description     TEXT DEFAULT '',
    salary_min      INTEGER,
    salary_max      INTEGER,
    salary_currency TEXT DEFAULT 'USD',
    salary_period   TEXT DEFAULT 'hour' CHECK(salary_period IN ('hour','month','year')),
    location        TEXT DEFAULT 'Remote',
    remote_type     TEXT DEFAULT 'worldwide' CHECK(remote_type IN ('worldwide','europe','usa','turkey','other')),
    job_type        TEXT DEFAULT 'fulltime' CHECK(job_type IN ('fulltime','parttime','contract','freelance','internship')),
    experience      TEXT DEFAULT 'mid' CHECK(experience IN ('intern','junior','mid','senior','lead','any')),
    tech_stack      TEXT DEFAULT '[]',
    requirements    TEXT DEFAULT '[]',
    benefits        TEXT DEFAULT '[]',
    apply_url       TEXT NOT NULL,
    ref_url         TEXT DEFAULT '',
    priority        INTEGER DEFAULT 0 CHECK(priority BETWEEN 0 AND 5),
    status          TEXT DEFAULT 'active' CHECK(status IN ('active','filled','expired','draft')),
    posted_at       TEXT DEFAULT (datetime('now')),
    expires_at      TEXT,
    created_at      TEXT DEFAULT (datetime('now')),
    updated_at      TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (platform_id) REFERENCES platforms(id)
  );

  -- Social media posts tracking
  CREATE TABLE IF NOT EXISTS posts (
    id          TEXT PRIMARY KEY,
    job_id      TEXT,
    channel     TEXT NOT NULL CHECK(channel IN ('telegram','discord','twitter','linkedin','reddit','manual')),
    message     TEXT NOT NULL,
    post_ext_id TEXT DEFAULT '',
    post_url    TEXT DEFAULT '',
    status      TEXT DEFAULT 'draft' CHECK(status IN ('draft','scheduled','sent','failed')),
    scheduled   TEXT,
    sent_at     TEXT,
    error       TEXT DEFAULT '',
    created_at  TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
  );

  -- Click/event tracking
  CREATE TABLE IF NOT EXISTS clicks (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id     TEXT NOT NULL,
    channel    TEXT DEFAULT 'direct',
    ip         TEXT DEFAULT '',
    ua         TEXT DEFAULT '',
    referer    TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );

  -- Revenue tracking
  CREATE TABLE IF NOT EXISTS revenue (
    id          TEXT PRIMARY KEY,
    job_id      TEXT,
    platform_id TEXT NOT NULL,
    candidate   TEXT DEFAULT '',
    amount      REAL NOT NULL,
    currency    TEXT DEFAULT 'USD',
    status      TEXT DEFAULT 'pending' CHECK(status IN ('pending','confirmed','paid','cancelled')),
    paid_at     TEXT,
    notes       TEXT DEFAULT '',
    created_at  TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL,
    FOREIGN KEY (platform_id) REFERENCES platforms(id)
  );

  -- Community groups for distribution
  CREATE TABLE IF NOT EXISTS communities (
    id          TEXT PRIMARY KEY,
    channel     TEXT NOT NULL CHECK(channel IN ('telegram','discord','reddit','linkedin','twitter','facebook','other')),
    name        TEXT NOT NULL,
    url         TEXT DEFAULT '',
    members     INTEGER DEFAULT 0,
    language    TEXT DEFAULT 'en',
    category    TEXT DEFAULT 'general',
    post_rules  TEXT DEFAULT '',
    max_per_day INTEGER DEFAULT 1,
    status      TEXT DEFAULT 'active' CHECK(status IN ('active','paused','banned','left')),
    last_post   TEXT,
    score       REAL DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now'))
  );

  -- Competitor tracking
  CREATE TABLE IF NOT EXISTS competitors (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    url         TEXT NOT NULL,
    type        TEXT DEFAULT 'direct' CHECK(type IN ('direct','indirect','potential')),
    channels    TEXT DEFAULT '[]',
    strengths   TEXT DEFAULT '',
    weaknesses  TEXT DEFAULT '',
    audience    TEXT DEFAULT '',
    pricing     TEXT DEFAULT '',
    notes       TEXT DEFAULT '',
    created_at  TEXT DEFAULT (datetime('now'))
  );

  -- Daily metrics snapshot
  CREATE TABLE IF NOT EXISTS metrics (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    date       TEXT NOT NULL,
    channel    TEXT NOT NULL,
    followers  INTEGER DEFAULT 0,
    posts      INTEGER DEFAULT 0,
    clicks     INTEGER DEFAULT 0,
    applies    INTEGER DEFAULT 0,
    revenue    REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(date, channel)
  );

  -- App settings (key-value)
  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// ─── INDEXES ──────────────────────────────────────────────

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
  CREATE INDEX IF NOT EXISTS idx_jobs_platform ON jobs(platform_id);
  CREATE INDEX IF NOT EXISTS idx_jobs_posted ON jobs(posted_at DESC);
  CREATE INDEX IF NOT EXISTS idx_jobs_priority ON jobs(priority DESC);
  CREATE INDEX IF NOT EXISTS idx_posts_job ON posts(job_id);
  CREATE INDEX IF NOT EXISTS idx_posts_channel ON posts(channel);
  CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
  CREATE INDEX IF NOT EXISTS idx_clicks_job ON clicks(job_id);
  CREATE INDEX IF NOT EXISTS idx_clicks_date ON clicks(created_at);
  CREATE INDEX IF NOT EXISTS idx_revenue_status ON revenue(status);
  CREATE INDEX IF NOT EXISTS idx_metrics_date ON metrics(date DESC);
`);

// ─── DEFAULT PLATFORMS ────────────────────────────────────

const insertPlatform = db.prepare(`
  INSERT OR IGNORE INTO platforms (id, name, base_url, ref_url_tpl, commission)
  VALUES (?, ?, ?, ?, ?)
`);

const platforms = [
  ['mercor',    'Mercor',         'https://work.mercor.com',     'https://work.mercor.com/explore?ref={code}', '$500-2000 per hire'],
  ['turing',    'Turing',         'https://www.turing.com',      'https://www.turing.com/?ref={code}',          '10% first 3 months'],
  ['toptal',    'Toptal',         'https://www.toptal.com',      'https://www.toptal.com/referral/{code}',      '$500 per hire'],
  ['lemon',     'Lemon.io',       'https://lemon.io',            'https://lemon.io/?ref={code}',                '$500 per hire'],
  ['arc',       'Arc.dev',        'https://arc.dev',             'https://arc.dev/?ref={code}',                 '$250 per hire'],
  ['remoteok',  'RemoteOK',       'https://remoteok.com',        'https://remoteok.com/?ref={code}',            'Affiliate %'],
  ['gun',       'Gun.io',         'https://gun.io',              'https://gun.io/?ref={code}',                  '$500 per hire'],
  ['crossover', 'Crossover',      'https://crossover.com',       'https://crossover.com/?ref={code}',           '$100-500'],
  ['wellfound', 'Wellfound',      'https://wellfound.com',       'https://wellfound.com/?ref={code}',           'Variable'],
  ['manual',    'Direct/Manual',  'https://example.com',         '',                                             'Custom'],
];

for (const [id, name, base_url, ref_url_tpl, commission] of platforms) {
  insertPlatform.run(id, name, base_url, ref_url_tpl, commission);
}

// ─── DEFAULT COMPETITORS ──────────────────────────────────

const insertCompetitor = db.prepare(`
  INSERT OR IGNORE INTO competitors (id, name, url, type, channels, strengths, weaknesses, audience, pricing)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const competitors = [
  ['c1', 'Yabangee Jobs',     'https://yabangee.com/jobs',     'direct',   '["website","twitter"]',   'TR-focused, established brand',           'Limited to Istanbul, not tech-specific', 'Expats in Turkey',        'Free'],
  ['c2', 'Turkiye Remote',    'https://turkiyeremote.com',     'direct',   '["website","telegram"]',  'Turkish language, local focus',            'Small audience, irregular updates',      'Turkish remote workers',  'Free'],
  ['c3', 'RemoteOK',          'https://remoteok.com',          'indirect', '["website","twitter"]',   'Huge audience, well-known brand',         'No Turkish focus, high competition',     'Global developers',       'Paid job posts'],
  ['c4', 'We Work Remotely',  'https://weworkremotely.com',    'indirect', '["website","newsletter"]','Premium brand, quality listings',          'Expensive, no TR focus',                 'Senior developers',       'Paid job posts'],
  ['c5', 'Kodilan',           'https://kodilan.com',           'direct',   '["website"]',             'Turkish dev community, local listings',    'Not remote-focused, limited reach',      'Turkish developers',      'Free/Paid'],
  ['c6', 'Toptalent.co',      'https://toptalent.co',          'potential', '["website","linkedin"]',  'AI matching, premium clients',             'Unknown brand, small',                   'Senior talent',           'Commission'],
];

for (const [id, name, url, type, channels, str, weak, aud, price] of competitors) {
  insertCompetitor.run(id, name, url, type, channels, str, weak, aud, price);
}

// ─── DEFAULT COMMUNITIES ──────────────────────────────────

const insertCommunity = db.prepare(`
  INSERT OR IGNORE INTO communities (id, channel, name, url, members, language, category, post_rules, max_per_day)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const communities = [
  // Telegram - TR
  ['tg-tr-1', 'telegram', 'Yazilimcilar Turkiye',    'https://t.me/yazilimcilartr',   15000, 'tr', 'dev',      'Job posts allowed, max 1/day', 1],
  ['tg-tr-2', 'telegram', 'Freelancer Turkiye',      'https://t.me/freelancertr',     10000, 'tr', 'freelance','Job posts in #jobs thread',    1],
  ['tg-tr-3', 'telegram', 'Remote Calisanlar TR',    'https://t.me/remotecalisanlar',  8000, 'tr', 'remote',   'Only remote jobs',             1],
  ['tg-tr-4', 'telegram', 'IT Jobs Turkiye',         'https://t.me/itjobstr',         12000, 'tr', 'jobs',     'Jobs only channel',            2],
  // Telegram - Global
  ['tg-gl-1', 'telegram', 'Remote Jobs Worldwide',   'https://t.me/remotejobsww',     50000, 'en', 'remote',   'Format required',              1],
  ['tg-gl-2', 'telegram', 'Python Jobs',             'https://t.me/pythonjobs',       30000, 'en', 'dev',      'Python-related only',          1],
  ['tg-gl-3', 'telegram', 'AI/ML Jobs',              'https://t.me/aimljobs',         25000, 'en', 'ai',       'AI/ML positions only',         1],
  // Discord
  ['dc-1',    'discord',  'Reactiflux',              'https://discord.gg/reactiflux', 200000,'en', 'dev',      '#job-board channel',           1],
  ['dc-2',    'discord',  'Python Discord',           'https://discord.gg/python',    350000, 'en', 'dev',      '#jobs channel',                1],
  ['dc-3',    'discord',  'The Programmers Hangout',  'https://discord.gg/programming',150000,'en', 'dev',      '#job-listings',                1],
  ['dc-4',    'discord',  'Turk Yazilimcilar',       'https://discord.gg/turkyazilim', 20000,'tr', 'dev',      'Job posts allowed',            2],
  // Reddit
  ['rd-1',    'reddit',   'r/remotejobs',            'https://reddit.com/r/remotejobs',1200000,'en','remote',  '[Hiring] flair required',      1],
  ['rd-2',    'reddit',   'r/forhire',               'https://reddit.com/r/forhire',  600000, 'en', 'jobs',    '[Hiring] format',              1],
  ['rd-3',    'reddit',   'r/Turkey',                'https://reddit.com/r/Turkey',   500000, 'tr', 'general', 'Job posts in megathread only', 1],
  // LinkedIn Groups
  ['li-1',    'linkedin', 'Remote Work Network',     'https://linkedin.com/groups/1',2100000,'en', 'remote',   'Max 2/week',                   1],
  ['li-2',    'linkedin', 'Turkey Tech',             'https://linkedin.com/groups/2', 150000, 'tr', 'dev',     'Max 3/week',                   1],
];

for (const [id, ch, name, url, members, lang, cat, rules, max] of communities) {
  insertCommunity.run(id, ch, name, url, members, lang, cat, rules, max);
}

// ─── DEFAULT SETTINGS ─────────────────────────────────────

const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
const settings = [
  ['owner_email',     'turhanhamza@gmail.com'],
  ['owner_name',      'Turhan Hamza'],
  ['brand_name',      'Talent Bridge'],
  ['timezone',        'Europe/Istanbul'],
  ['daily_post_limit','20'],
  ['auto_post',       'false'],
  ['default_lang',    'tr'],
];
for (const [k, v] of settings) insertSetting.run(k, v);

console.log('✅ Database initialized successfully');
console.log('   Tables: platforms, jobs, posts, clicks, revenue, communities, competitors, metrics, settings');
console.log('   Platforms: ' + platforms.length);
console.log('   Competitors: ' + competitors.length);
console.log('   Communities: ' + communities.length);

process.exit(0);
