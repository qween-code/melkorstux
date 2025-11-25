/**
 * Database Seed Script
 * Populates database with sample data for testing
 */

import { nanoid } from 'nanoid';
import { getDb } from './connection.js';

const db = getDb();

console.log('🌱 Starting database seeding...\n');

try {
  // Sample jobs
  console.log('💼 Seeding jobs...');
  const jobsData = [
    {
      id: nanoid(),
      title: 'Senior AI/ML Engineer',
      company: 'Anthropic',
      description: 'Join our team to work on cutting-edge AI safety research and development.',
      salary_min: 120,
      salary_max: 180,
      salary_currency: 'USD',
      location: 'Remote - Worldwide',
      remote_type: 'fully_remote',
      job_type: 'full_time',
      experience_level: 'senior',
      tech_stack: JSON.stringify(['Python', 'PyTorch', 'TensorFlow', 'AWS', 'Docker']),
      requirements: JSON.stringify([
        '5+ years of ML/AI experience',
        'Strong Python skills',
        'Experience with LLMs',
        'Excellent communication skills'
      ]),
      benefits: JSON.stringify([
        'Competitive salary',
        'Remote work',
        'Health insurance',
        'Learning budget'
      ]),
      source_platform: 'Mercor',
      source_url: 'https://work.mercor.com/explore',
      referral_link: 'https://work.mercor.com/explore?ref=YOUR_REF_CODE',
      posted_date: new Date().toISOString(),
      status: 'active',
      priority: 5
    },
    {
      id: nanoid(),
      title: 'Full Stack Developer',
      company: 'OpenAI',
      description: 'Build amazing products that millions of users love.',
      salary_min: 80,
      salary_max: 130,
      salary_currency: 'USD',
      location: 'Remote - Europe',
      remote_type: 'fully_remote',
      job_type: 'full_time',
      experience_level: 'mid',
      tech_stack: JSON.stringify(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis']),
      requirements: JSON.stringify([
        '3+ years of full stack experience',
        'Strong React and Node.js skills',
        'Experience with TypeScript',
        'Good problem-solving skills'
      ]),
      benefits: JSON.stringify([
        'Flexible hours',
        'Remote work',
        'Latest hardware',
        'Stock options'
      ]),
      source_platform: 'Mercor',
      source_url: 'https://work.mercor.com/explore',
      referral_link: 'https://work.mercor.com/explore?ref=YOUR_REF_CODE',
      posted_date: new Date().toISOString(),
      status: 'active',
      priority: 4
    },
    {
      id: nanoid(),
      title: 'DevOps Engineer',
      company: 'YC-backed Startup',
      description: 'Scale our infrastructure to support millions of users.',
      salary_min: 70,
      salary_max: 110,
      salary_currency: 'USD',
      location: 'Remote - Worldwide',
      remote_type: 'fully_remote',
      job_type: 'contract',
      experience_level: 'mid',
      tech_stack: JSON.stringify(['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python']),
      requirements: JSON.stringify([
        '3+ years of DevOps experience',
        'AWS expertise',
        'Kubernetes experience',
        'CI/CD pipeline knowledge'
      ]),
      benefits: JSON.stringify([
        'Hourly rate',
        'Flexible schedule',
        'Remote work',
        'Cutting-edge tech'
      ]),
      source_platform: 'Mercor',
      source_url: 'https://work.mercor.com/explore',
      referral_link: 'https://work.mercor.com/explore?ref=YOUR_REF_CODE',
      posted_date: new Date().toISOString(),
      status: 'active',
      priority: 3
    }
  ];

  const insertJob = db.prepare(`
    INSERT INTO jobs (
      id, title, company, description, salary_min, salary_max, salary_currency,
      location, remote_type, job_type, experience_level, tech_stack, requirements,
      benefits, source_platform, source_url, referral_link, posted_date, status, priority
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  jobsData.forEach(job => {
    insertJob.run(
      job.id, job.title, job.company, job.description, job.salary_min, job.salary_max,
      job.salary_currency, job.location, job.remote_type, job.job_type, job.experience_level,
      job.tech_stack, job.requirements, job.benefits, job.source_platform, job.source_url,
      job.referral_link, job.posted_date, job.status, job.priority
    );
    console.log(`  ├─ Added: ${job.title} at ${job.company}`);
  });
  console.log('  └─ ✅ Jobs seeded\n');

  // Sample content templates
  console.log('📝 Seeding content templates...');
  const templatesData = [
    {
      id: nanoid(),
      name: 'LinkedIn Single Job Post',
      platform: 'linkedin',
      template_type: 'single_post',
      template_content: `🚀 {{company}} is hiring {{title}}!

💰 Salary: ${{salary_min}}-{{salary_max}}/hour
🌍 Location: {{location}}
🛠 Stack: {{tech_stack}}

Requirements:
{{requirements}}

👉 Apply now: {{referral_link}}

#remotejobs #hiring #{{primary_tech}}`,
      variables: JSON.stringify(['company', 'title', 'salary_min', 'salary_max', 'location', 'tech_stack', 'requirements', 'referral_link', 'primary_tech']),
      is_active: 1
    },
    {
      id: nanoid(),
      name: 'Twitter Single Job Tweet',
      platform: 'twitter',
      template_type: 'single_post',
      template_content: `🔥 HOT JOB ALERT

{{title}} @ {{company}}
💰 ${{salary_min}}-{{salary_max}}/hr
🌍 Remote

Apply: {{referral_link}}

#remotejobs #techjobs #{{primary_tech}}`,
      variables: JSON.stringify(['company', 'title', 'salary_min', 'salary_max', 'referral_link', 'primary_tech']),
      is_active: 1
    },
    {
      id: nanoid(),
      name: 'Discord Job Message',
      platform: 'discord',
      template_type: 'single_post',
      template_content: `━━━━━━━━━━━━━━━━━━━━━━━━
🚀 REMOTE JOB OPPORTUNITY
━━━━━━━━━━━━━━━━━━━━━━━━

📌 Role: {{title}}
🏢 Company: {{company}}
💰 Compensation: ${{salary_min}}-{{salary_max}}/hour
🌍 Location: {{location}}

📋 Requirements:
{{requirements}}

🔗 Apply: {{referral_link}}
━━━━━━━━━━━━━━━━━━━━━━━━`,
      variables: JSON.stringify(['title', 'company', 'salary_min', 'salary_max', 'location', 'requirements', 'referral_link']),
      is_active: 1
    }
  ];

  const insertTemplate = db.prepare(`
    INSERT INTO templates (id, name, platform, template_type, template_content, variables, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  templatesData.forEach(template => {
    insertTemplate.run(
      template.id, template.name, template.platform, template.template_type,
      template.template_content, template.variables, template.is_active
    );
    console.log(`  ├─ Added template: ${template.name}`);
  });
  console.log('  └─ ✅ Templates seeded\n');

  // Sample communities
  console.log('👥 Seeding communities...');
  const communitiesData = [
    {
      id: nanoid(),
      platform: 'linkedin',
      name: 'Remote Work & Digital Nomads',
      url: 'https://linkedin.com/groups/remote-work',
      member_count: 2100000,
      status: 'active',
      posting_rules: 'Post max 2x per week, must be relevant to remote work',
      best_post_times: '09:00,12:00,17:00'
    },
    {
      id: nanoid(),
      platform: 'discord',
      name: 'Reactiflux',
      url: 'https://discord.gg/reactiflux',
      member_count: 200000,
      status: 'active',
      posting_rules: 'Use #jobs channel, follow template',
      best_post_times: '14:00,18:00'
    },
    {
      id: nanoid(),
      platform: 'telegram',
      name: 'Remote Jobs Worldwide',
      url: 'https://t.me/remotejobsworldwide',
      member_count: 50000,
      status: 'active',
      posting_rules: 'Max 1 post per day',
      best_post_times: '10:00,16:00'
    }
  ];

  const insertCommunity = db.prepare(`
    INSERT INTO communities (id, platform, name, url, member_count, status, posting_rules, best_post_times)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  communitiesData.forEach(community => {
    insertCommunity.run(
      community.id, community.platform, community.name, community.url,
      community.member_count, community.status, community.posting_rules, community.best_post_times
    );
    console.log(`  ├─ Added community: ${community.name}`);
  });
  console.log('  └─ ✅ Communities seeded\n');

  console.log('✨ Seeding completed successfully!');
  console.log('📊 Database populated with sample data.\n');

} catch (error) {
  console.error('❌ Seeding failed:', error.message);
  process.exit(1);
}

process.exit(0);
