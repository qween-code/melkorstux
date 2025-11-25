/**
 * Database Schema for Talent Bridge
 * SQLite database schema definitions
 */

export const schema = {
  // Jobs table - stores all job listings
  jobs: `
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      description TEXT,
      salary_min INTEGER,
      salary_max INTEGER,
      salary_currency TEXT DEFAULT 'USD',
      location TEXT,
      remote_type TEXT CHECK(remote_type IN ('fully_remote', 'hybrid', 'onsite')),
      job_type TEXT CHECK(job_type IN ('full_time', 'part_time', 'contract', 'internship')),
      experience_level TEXT CHECK(experience_level IN ('entry', 'mid', 'senior', 'lead', 'executive')),
      tech_stack TEXT,
      requirements TEXT,
      benefits TEXT,
      source_platform TEXT NOT NULL,
      source_url TEXT,
      referral_link TEXT NOT NULL,
      posted_date TEXT NOT NULL,
      expires_date TEXT,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'filled', 'expired', 'archived')),
      priority INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // Content table - stores generated content for social media
  content: `
    CREATE TABLE IF NOT EXISTS content (
      id TEXT PRIMARY KEY,
      job_id TEXT,
      platform TEXT NOT NULL CHECK(platform IN ('linkedin', 'twitter', 'discord', 'telegram', 'reddit', 'facebook', 'instagram')),
      content_type TEXT CHECK(content_type IN ('single_post', 'thread', 'carousel', 'story', 'video')),
      content_text TEXT NOT NULL,
      media_urls TEXT,
      hashtags TEXT,
      scheduled_time TEXT,
      posted_time TEXT,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'posted', 'failed')),
      post_url TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
    )
  `,

  // Analytics table - tracks performance metrics
  analytics: `
    CREATE TABLE IF NOT EXISTS analytics (
      id TEXT PRIMARY KEY,
      job_id TEXT,
      content_id TEXT,
      platform TEXT NOT NULL,
      metric_type TEXT NOT NULL CHECK(metric_type IN ('impression', 'click', 'application', 'interview', 'hire')),
      metric_value INTEGER DEFAULT 1,
      source_url TEXT,
      user_agent TEXT,
      ip_address TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      metadata TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
      FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE SET NULL
    )
  `,

  // Revenue table - tracks earnings from referrals
  revenue: `
    CREATE TABLE IF NOT EXISTS revenue (
      id TEXT PRIMARY KEY,
      job_id TEXT NOT NULL,
      candidate_name TEXT,
      candidate_email TEXT,
      hire_date TEXT NOT NULL,
      commission_amount REAL NOT NULL,
      commission_currency TEXT DEFAULT 'USD',
      payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'processing', 'paid', 'failed')),
      payment_date TEXT,
      platform TEXT NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE RESTRICT
    )
  `,

  // Communities table - stores social media communities/groups
  communities: `
    CREATE TABLE IF NOT EXISTS communities (
      id TEXT PRIMARY KEY,
      platform TEXT NOT NULL,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      member_count INTEGER,
      join_date TEXT,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'banned', 'left')),
      posting_rules TEXT,
      best_post_times TEXT,
      performance_score REAL DEFAULT 0,
      last_posted_at TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // Content templates - reusable content templates
  templates: `
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      platform TEXT NOT NULL,
      template_type TEXT NOT NULL,
      template_content TEXT NOT NULL,
      variables TEXT,
      usage_count INTEGER DEFAULT 0,
      performance_score REAL DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // Settings table - application settings
  settings: `
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      description TEXT,
      category TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // Activity log - audit trail
  activity_log: `
    CREATE TABLE IF NOT EXISTS activity_log (
      id TEXT PRIMARY KEY,
      action_type TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      user_id TEXT,
      details TEXT,
      ip_address TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `
};

// Indexes for performance optimization
export const indexes = [
  'CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status)',
  'CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs(posted_date DESC)',
  'CREATE INDEX IF NOT EXISTS idx_jobs_source_platform ON jobs(source_platform)',
  'CREATE INDEX IF NOT EXISTS idx_content_job_id ON content(job_id)',
  'CREATE INDEX IF NOT EXISTS idx_content_platform ON content(platform)',
  'CREATE INDEX IF NOT EXISTS idx_content_status ON content(status)',
  'CREATE INDEX IF NOT EXISTS idx_content_scheduled_time ON content(scheduled_time)',
  'CREATE INDEX IF NOT EXISTS idx_analytics_job_id ON analytics(job_id)',
  'CREATE INDEX IF NOT EXISTS idx_analytics_content_id ON analytics(content_id)',
  'CREATE INDEX IF NOT EXISTS idx_analytics_platform ON analytics(platform)',
  'CREATE INDEX IF NOT EXISTS idx_analytics_metric_type ON analytics(metric_type)',
  'CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC)',
  'CREATE INDEX IF NOT EXISTS idx_revenue_job_id ON revenue(job_id)',
  'CREATE INDEX IF NOT EXISTS idx_revenue_payment_status ON revenue(payment_status)',
  'CREATE INDEX IF NOT EXISTS idx_communities_platform ON communities(platform)',
  'CREATE INDEX IF NOT EXISTS idx_communities_status ON communities(status)'
];

export default { schema, indexes };
