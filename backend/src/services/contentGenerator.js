/**
 * Content Generator Service
 * Generates social media content from job data using templates
 */

import Job from '../models/Job.js';
import { query } from '../db/connection.js';

class ContentGenerator {
  /**
   * Generate content for a job
   */
  async generate({ job_id, platform, template_id }) {
    const job = Job.findById(job_id);

    if (!job) {
      throw new Error('Job not found');
    }

    // Get template
    let template;
    if (template_id) {
      template = query('SELECT * FROM templates WHERE id = ?', [template_id])[0];
    } else {
      // Get default template for platform
      template = query(
        'SELECT * FROM templates WHERE platform = ? AND is_active = 1 ORDER BY usage_count DESC LIMIT 1',
        [platform]
      )[0];
    }

    if (!template) {
      // Use fallback template
      template = this.getFallbackTemplate(platform);
    }

    // Generate content
    const content = this.replaceVariables(template.template_content, job);
    const hashtags = this.generateHashtags(job, platform);

    return {
      text: content,
      hashtags: hashtags,
      platform: platform,
      template_id: template.id || null
    };
  }

  /**
   * Replace template variables with job data
   */
  replaceVariables(template, job) {
    let content = template;

    // Basic replacements
    const replacements = {
      '{{company}}': job.company,
      '{{title}}': job.title,
      '{{salary_min}}': job.salary_min || 'Competitive',
      '{{salary_max}}': job.salary_max || '',
      '{{location}}': job.location || 'Remote',
      '{{referral_link}}': job.referral_link
    };

    Object.keys(replacements).forEach(key => {
      content = content.replace(new RegExp(key, 'g'), replacements[key]);
    });

    // Tech stack
    if (job.tech_stack && job.tech_stack.length > 0) {
      const techStackStr = job.tech_stack.slice(0, 4).join(', ');
      content = content.replace(/{{tech_stack}}/g, techStackStr);
      content = content.replace(/{{primary_tech}}/g, job.tech_stack[0]);
    }

    // Requirements
    if (job.requirements && job.requirements.length > 0) {
      const requirementsStr = job.requirements
        .slice(0, 3)
        .map(req => `• ${req}`)
        .join('\n');
      content = content.replace(/{{requirements}}/g, requirementsStr);
    }

    // Benefits
    if (job.benefits && job.benefits.length > 0) {
      const benefitsStr = job.benefits
        .slice(0, 3)
        .map(ben => `• ${ben}`)
        .join('\n');
      content = content.replace(/{{benefits}}/g, benefitsStr);
    }

    return content;
  }

  /**
   * Generate hashtags based on job data
   */
  generateHashtags(job, platform) {
    const hashtags = ['remotejobs', 'hiring', 'techjobs'];

    // Add tech-specific hashtags
    if (job.tech_stack && job.tech_stack.length > 0) {
      job.tech_stack.slice(0, 2).forEach(tech => {
        hashtags.push(tech.toLowerCase().replace(/[^a-z0-9]/g, ''));
      });
    }

    // Add experience level
    if (job.experience_level) {
      hashtags.push(`${job.experience_level}level`);
    }

    // Platform-specific hashtag limits
    const limits = {
      twitter: 3,
      linkedin: 5,
      instagram: 10
    };

    const limit = limits[platform] || 5;

    return hashtags
      .slice(0, limit)
      .map(tag => `#${tag}`)
      .join(' ');
  }

  /**
   * Get fallback template if no template found
   */
  getFallbackTemplate(platform) {
    const templates = {
      linkedin: {
        template_content: `🚀 {{company}} is hiring {{title}}!

💰 Salary: ${{salary_min}}-{{salary_max}}/hour
🌍 Location: {{location}}
🛠 Stack: {{tech_stack}}

👉 Apply now: {{referral_link}}

#remotejobs #hiring #{{primary_tech}}`
      },
      twitter: {
        template_content: `🔥 {{title}} @ {{company}}

💰 ${{salary_min}}-{{salary_max}}/hr
🌍 Remote

Apply: {{referral_link}}

#remotejobs #techjobs`
      },
      discord: {
        template_content: `━━━━━━━━━━━━━━━━━━━━━━━━
🚀 REMOTE JOB OPPORTUNITY
━━━━━━━━━━━━━━━━━━━━━━━━

📌 Role: {{title}}
🏢 Company: {{company}}
💰 Compensation: ${{salary_min}}-{{salary_max}}/hour
🌍 Location: {{location}}

🔗 Apply: {{referral_link}}
━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      telegram: {
        template_content: `🔥 HOT JOB ALERT

Position: {{title}}
Company: {{company}}
Pay: ${{salary_min}}-{{salary_max}}/hour
Location: {{location}}

Apply: {{referral_link}}`
      }
    };

    return templates[platform] || templates.linkedin;
  }

  /**
   * Generate multiple content variants for A/B testing
   */
  async generateVariants({ job_id, platform, count = 3 }) {
    const job = Job.findById(job_id);

    if (!job) {
      throw new Error('Job not found');
    }

    const variants = [];

    // Get multiple templates
    const templates = query(
      'SELECT * FROM templates WHERE platform = ? AND is_active = 1 LIMIT ?',
      [platform, count]
    );

    for (const template of templates) {
      const content = this.replaceVariables(template.template_content, job);
      const hashtags = this.generateHashtags(job, platform);

      variants.push({
        text: content,
        hashtags: hashtags,
        template_id: template.id,
        template_name: template.name
      });
    }

    // If not enough templates, create variations
    while (variants.length < count) {
      const fallback = this.getFallbackTemplate(platform);
      const content = this.replaceVariables(fallback.template_content, job);
      const hashtags = this.generateHashtags(job, platform);

      variants.push({
        text: content,
        hashtags: hashtags,
        template_id: null,
        template_name: 'Fallback'
      });
    }

    return variants;
  }
}

export const contentGenerator = new ContentGenerator();
export default contentGenerator;
