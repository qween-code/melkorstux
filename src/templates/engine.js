/**
 * Content Template Engine
 * Generates platform-specific messages from job data
 */

const TEMPLATES = {
  // ─── TELEGRAM ─────────────────────────────────────────
  telegram: {
    single_tr: (job) => `
🔥 *REMOTE İŞ FIRSATI*

📌 *${job.title}*
🏢 ${job.company}
💰 ${salaryText(job)}
🌍 ${job.location}
🛠 ${techText(job)}

📋 Gereksinimler:
${listText(job.requirements)}

✅ Avantajlar:
${listText(job.benefits)}

👉 Başvur: ${job.ref_url || job.apply_url}

${hashtagsTR(job)}`.trim(),

    single_en: (job) => `
🔥 *HOT REMOTE JOB*

📌 *${job.title}*
🏢 ${job.company}
💰 ${salaryText(job)}
🌍 ${job.location}
🛠 ${techText(job)}

Requirements:
${listText(job.requirements)}

👉 Apply: ${job.ref_url || job.apply_url}

${hashtagsEN(job)}`.trim(),

    list_tr: (jobs) => {
      let msg = `📢 *Günün Remote İş Fırsatları*\n\n`;
      jobs.slice(0, 5).forEach((job, i) => {
        msg += `${i + 1}️⃣ *${job.title}* — ${job.company}\n`;
        msg += `   💰 ${salaryText(job)} | 🌍 ${job.location}\n\n`;
      });
      msg += `\n🔗 Tüm başvuru linkleri aşağıda 👇`;
      jobs.slice(0, 5).forEach((job, i) => {
        msg += `\n${i + 1}. ${job.ref_url || job.apply_url}`;
      });
      return msg.trim();
    },
  },

  // ─── DISCORD ──────────────────────────────────────────
  discord: {
    embed: (job) => ({
      embeds: [{
        title: `🚀 ${job.title}`,
        description: `**${job.company}** is hiring!\n\n${job.description?.slice(0, 300) || ''}`,
        color: 0x5865F2,
        fields: [
          { name: '💰 Salary', value: salaryText(job), inline: true },
          { name: '🌍 Location', value: job.location, inline: true },
          { name: '⏰ Type', value: capitalize(job.job_type), inline: true },
          { name: '🛠 Tech Stack', value: techText(job) || 'N/A', inline: false },
          { name: '📋 Requirements', value: listText(job.requirements).slice(0, 500) || 'See link', inline: false },
        ],
        url: job.ref_url || job.apply_url,
        footer: { text: 'Talent Bridge | Remote Jobs' },
        timestamp: new Date().toISOString(),
      }]
    }),

    simple: (job) =>
`**🚀 REMOTE JOB OPPORTUNITY**

📌 **${job.title}**
🏢 ${job.company}
💰 ${salaryText(job)}
🌍 ${job.location}
🛠 ${techText(job)}

🔗 Apply: <${job.ref_url || job.apply_url}>`.trim(),
  },

  // ─── TWITTER ──────────────────────────────────────────
  twitter: {
    single: (job) => {
      // Twitter has 280 char limit
      let tweet = `🔥 ${job.company} is hiring: ${job.title}\n\n`;
      tweet += `💰 ${salaryText(job)}\n`;
      tweet += `🌍 ${job.location}\n\n`;
      tweet += `Apply: ${job.ref_url || job.apply_url}\n\n`;
      tweet += `#remotejobs #hiring`;
      if (job.tech_stack?.[0]) tweet += ` #${job.tech_stack[0].toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      return tweet.slice(0, 280).trim();
    },

    thread: (jobs) => {
      const tweets = [];
      tweets.push(`🧵 This week's TOP ${Math.min(jobs.length, 5)} Remote Jobs:\n\n${jobs.slice(0, 5).map((j, i) => `${i + 1}. ${j.title} @ ${j.company}\n   💰 ${salaryText(j)}`).join('\n\n')}\n\nLinks below 👇`);
      jobs.slice(0, 5).forEach((j, i) => {
        tweets.push(`${i + 1}/${Math.min(jobs.length, 5)} ${j.title} @ ${j.company}\n\n💰 ${salaryText(j)}\n🛠 ${techText(j)}\n\nApply: ${j.ref_url || j.apply_url}`);
      });
      return tweets;
    }
  },

  // ─── LINKEDIN ─────────────────────────────────────────
  linkedin: {
    single: (job) => `
🚀 ${job.company} is hiring ${job.title}!

💰 Salary: ${salaryText(job)}
🌍 Location: ${job.location}
🛠 Stack: ${techText(job)}
⏰ Type: ${capitalize(job.job_type)}

${job.requirements?.length ? 'Requirements:\n' + listText(job.requirements) + '\n' : ''}
👉 Apply now: ${job.ref_url || job.apply_url}

#remotejobs #hiring #${job.tech_stack?.[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'tech'} #${capitalize(job.experience)}Level`.trim(),

    weekly: (jobs) => {
      let post = `📢 This Week's TOP ${Math.min(jobs.length, 5)} Remote Positions!\n\n`;
      jobs.slice(0, 5).forEach((j, i) => {
        post += `${['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'][i]} ${j.title} @ ${j.company}\n   💵 ${salaryText(j)} | 🌍 ${j.location}\n\n`;
      });
      post += `\n🔗 All applications: ${jobs[0]?.ref_url || jobs[0]?.apply_url || '#'}\n\nWhich one catches your eye? 👇\n\n#remotejobs #hiring #techjobs`;
      return post.trim();
    }
  },

  // ─── REDDIT ───────────────────────────────────────────
  reddit: {
    post: (job) => ({
      title: `[Hiring] ${job.title} - ${salaryText(job)} - ${job.company} (${job.location})`,
      body: `**About the Role:**\n${job.description || `${job.company} is looking for a ${job.title}.`}\n\n**Compensation:**\n${salaryText(job)}\n\n**Tech Stack:**\n${techText(job)}\n\n**Requirements:**\n${listText(job.requirements)}\n\n**How to Apply:**\n${job.ref_url || job.apply_url}\n\n*Disclosure: This is a referral link.*`
    })
  }
};

// ─── HELPERS ──────────────────────────────────────────────

function salaryText(job) {
  if (!job.salary_min && !job.salary_max) return 'Competitive';
  const cur = job.salary_currency || 'USD';
  const per = job.salary_period === 'hour' ? '/hr' : job.salary_period === 'month' ? '/mo' : '/yr';
  if (job.salary_min && job.salary_max) return `$${job.salary_min}-${job.salary_max}${per}`;
  if (job.salary_min) return `$${job.salary_min}+${per}`;
  return `Up to $${job.salary_max}${per}`;
}

function techText(job) {
  if (!job.tech_stack?.length) return 'N/A';
  return job.tech_stack.slice(0, 5).join(', ');
}

function listText(arr) {
  if (!arr?.length) return '• See job posting';
  return arr.slice(0, 5).map(item => `• ${item}`).join('\n');
}

function hashtagsTR(job) {
  const tags = ['#remotework', '#uzaktancalısma', '#isilanı'];
  if (job.tech_stack?.[0]) tags.push(`#${job.tech_stack[0].toLowerCase().replace(/[^a-z0-9]/g, '')}`);
  return tags.join(' ');
}

function hashtagsEN(job) {
  const tags = ['#remotejobs', '#hiring', '#techjobs'];
  if (job.tech_stack?.[0]) tags.push(`#${job.tech_stack[0].toLowerCase().replace(/[^a-z0-9]/g, '')}`);
  return tags.join(' ');
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

// ─── PUBLIC API ───────────────────────────────────────────

export function render(channel, templateName, data) {
  const channelTemplates = TEMPLATES[channel];
  if (!channelTemplates) throw new Error(`Unknown channel: ${channel}`);
  const fn = channelTemplates[templateName];
  if (!fn) throw new Error(`Unknown template: ${channel}.${templateName}`);
  return fn(data);
}

export function availableTemplates() {
  const result = {};
  for (const [channel, templates] of Object.entries(TEMPLATES)) {
    result[channel] = Object.keys(templates);
  }
  return result;
}

export default { render, availableTemplates, TEMPLATES };
