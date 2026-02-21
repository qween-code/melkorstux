#!/usr/bin/env node
/**
 * Talent Bridge CLI
 * Quick job management from terminal
 *
 * Usage:
 *   node src/cli/index.js add         - Add a new job interactively
 *   node src/cli/index.js list        - List active jobs
 *   node src/cli/index.js post <id>   - Post a job to channels
 *   node src/cli/index.js stats       - Show dashboard stats
 *   node src/cli/index.js gen <id>    - Generate content for a job
 *   node src/cli/index.js competitors - Show competitor analysis
 */
import 'dotenv/config';
import { Command } from 'commander';
import { input, select, confirm } from '@inquirer/prompts';
import Table from 'cli-table3';
import chalk from 'chalk';
import { Jobs, Posts, Clicks, Revenue, Platforms, Competitors } from '../models/index.js';
import { render, availableTemplates } from '../templates/engine.js';
import { buildRefUrl } from '../services/referral.js';

const program = new Command();
program.name('tb').description('Talent Bridge CLI').version('2.0.0');

// ─── LIST ─────────────────────────────────────────────────

program.command('list')
  .description('List active jobs')
  .option('-s, --status <status>', 'Filter by status', 'active')
  .option('-n, --limit <n>', 'Number of jobs', '20')
  .action((opts) => {
    const jobs = Jobs.list({ status: opts.status, limit: parseInt(opts.limit) });

    if (jobs.length === 0) {
      console.log(chalk.yellow('No jobs found.'));
      return;
    }

    const table = new Table({
      head: ['ID', 'Title', 'Company', 'Salary', 'Platform', 'Pri'].map(h => chalk.cyan(h)),
      colWidths: [14, 28, 18, 16, 10, 5],
    });

    for (const j of jobs) {
      const salary = j.salary_min && j.salary_max ? `$${j.salary_min}-${j.salary_max}/${j.salary_period}` : 'N/A';
      table.push([j.id, j.title, j.company, salary, j.platform_id, '⭐'.repeat(j.priority)]);
    }

    console.log(table.toString());
    console.log(chalk.gray(`\n${jobs.length} job(s) found`));
  });

// ─── ADD ──────────────────────────────────────────────────

program.command('add')
  .description('Add a new job interactively')
  .action(async () => {
    console.log(chalk.bold.blue('\n📋 Add New Job\n'));

    const platforms = Platforms.list();

    const title = await input({ message: 'Job Title:', default: 'Senior ML Engineer' });
    const company = await input({ message: 'Company:' });
    const platform_id = await select({
      message: 'Platform:',
      choices: platforms.map(p => ({ name: p.name, value: p.id })),
    });
    const salary_min = await input({ message: 'Salary Min ($/hr):', default: '' });
    const salary_max = await input({ message: 'Salary Max ($/hr):', default: '' });
    const location = await input({ message: 'Location:', default: 'Remote - Worldwide' });
    const experience = await select({
      message: 'Experience:',
      choices: [
        { name: 'Any', value: 'any' },
        { name: 'Junior', value: 'junior' },
        { name: 'Mid', value: 'mid' },
        { name: 'Senior', value: 'senior' },
        { name: 'Lead', value: 'lead' },
      ],
    });
    const tech = await input({ message: 'Tech Stack (comma separated):', default: '' });
    const apply_url = await input({ message: 'Apply URL:' });
    const priority = await input({ message: 'Priority (0-5):', default: '3' });

    const ref_url = buildRefUrl(platform_id, apply_url, 'direct');

    const job = Jobs.create({
      title,
      company,
      platform_id,
      salary_min: salary_min ? Number(salary_min) : null,
      salary_max: salary_max ? Number(salary_max) : null,
      location,
      experience,
      tech_stack: tech ? tech.split(',').map(s => s.trim()) : [],
      apply_url,
      ref_url,
      priority: Number(priority) || 3,
    });

    console.log(chalk.green(`\n✅ Job created: ${job.id}`));
    console.log(chalk.gray(`   Referral URL: ${ref_url}`));

    const shouldPost = await confirm({ message: 'Post to channels now?', default: false });
    if (shouldPost) {
      console.log(chalk.yellow('Tip: Use `tb post ' + job.id + '` to post to specific channels'));
    }
  });

// ─── POST ─────────────────────────────────────────────────

program.command('post <jobId>')
  .description('Post a job to social channels')
  .option('-c, --channel <channel>', 'Channel (telegram/discord)')
  .action(async (jobId, opts) => {
    const job = Jobs.get(jobId);
    if (!job) { console.log(chalk.red('Job not found')); return; }

    const channel = opts.channel || await select({
      message: 'Post to:',
      choices: [
        { name: 'Telegram Channel', value: 'telegram' },
        { name: 'Discord Webhook', value: 'discord' },
        { name: 'Generate Copy (manual)', value: 'manual' },
      ]
    });

    if (channel === 'manual') {
      const tpls = availableTemplates();
      const platform = await select({ message: 'Platform:', choices: Object.keys(tpls).map(k => ({ name: k, value: k })) });
      const template = await select({ message: 'Template:', choices: tpls[platform].map(t => ({ name: t, value: t })) });

      const content = render(platform, template, job);
      console.log(chalk.bold('\n📝 Generated Content:\n'));
      console.log(typeof content === 'string' ? content : JSON.stringify(content, null, 2));
      console.log(chalk.gray('\nCopy and paste to your social media.'));
      return;
    }

    try {
      if (channel === 'telegram') {
        const { postJobToChannel } = await import('../bots/telegram.js');
        await postJobToChannel(job, 'tr');
        console.log(chalk.green('✅ Posted to Telegram'));
      } else if (channel === 'discord') {
        const { postViaWebhook } = await import('../bots/discord.js');
        await postViaWebhook(job);
        console.log(chalk.green('✅ Posted to Discord'));
      }
    } catch (err) {
      console.log(chalk.red(`❌ Failed: ${err.message}`));
    }
  });

// ─── GEN ──────────────────────────────────────────────────

program.command('gen <jobId>')
  .description('Generate content for all platforms')
  .action((jobId) => {
    const job = Jobs.get(jobId);
    if (!job) { console.log(chalk.red('Job not found')); return; }

    const tpls = availableTemplates();

    console.log(chalk.bold.blue(`\n📝 Content for: ${job.title} @ ${job.company}\n`));

    for (const [platform, templates] of Object.entries(tpls)) {
      for (const tpl of templates) {
        try {
          const content = render(platform, tpl, job);
          console.log(chalk.bold.cyan(`\n═══ ${platform.toUpperCase()} / ${tpl} ═══`));
          if (typeof content === 'string') {
            console.log(content);
          } else {
            console.log(JSON.stringify(content, null, 2));
          }
        } catch { /* skip incompatible templates */ }
      }
    }
  });

// ─── STATS ────────────────────────────────────────────────

program.command('stats')
  .description('Show dashboard statistics')
  .action(() => {
    const js = Jobs.stats();
    const ps = Posts.stats();
    const cs = Clicks.stats(30);
    const rs = Revenue.stats();

    console.log(chalk.bold.blue('\n📊 Talent Bridge Dashboard\n'));

    const table = new Table();
    table.push(
      [chalk.cyan('Active Jobs'), js.active, chalk.cyan('Total Jobs'), js.total],
      [chalk.cyan('Posts Sent'), ps.sent, chalk.cyan('Posts Today'), ps.today],
      [chalk.cyan('Clicks (30d)'), cs.total, chalk.cyan('Top Job Clicks'), cs.topJobs?.[0]?.clicks || 0],
      [chalk.cyan('Revenue Total'), `$${rs.total}`, chalk.cyan('Revenue Paid'), `$${rs.paid}`],
      [chalk.cyan('Pending $'), `$${rs.pending}`, chalk.cyan('Total Hires'), rs.count],
    );
    console.log(table.toString());

    if (cs.topJobs?.length) {
      console.log(chalk.bold('\n🏆 Top Clicked Jobs:'));
      cs.topJobs.slice(0, 5).forEach((j, i) => {
        console.log(`  ${i + 1}. ${j.title} @ ${j.company} — ${chalk.green(j.clicks + ' clicks')}`);
      });
    }
  });

// ─── COMPETITORS ──────────────────────────────────────────

program.command('competitors')
  .description('Show competitor analysis')
  .action(() => {
    const comps = Competitors.list();

    console.log(chalk.bold.blue('\n🎯 Competitor Analysis\n'));

    const table = new Table({
      head: ['Name', 'Type', 'Strengths', 'Weaknesses', 'Pricing'].map(h => chalk.cyan(h)),
      colWidths: [18, 10, 30, 30, 12],
      wordWrap: true,
    });

    for (const c of comps) {
      table.push([c.name, c.type, c.strengths, c.weaknesses, c.pricing]);
    }

    console.log(table.toString());
  });

program.parse();
