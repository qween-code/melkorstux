/**
 * Job Model
 * Handles all database operations for jobs
 */

import { nanoid } from 'nanoid';
import { query, queryOne, execute } from '../db/connection.js';

export class Job {
  /**
   * Create a new job
   */
  static create(jobData) {
    const id = nanoid();
    const now = new Date().toISOString();

    const sql = `
      INSERT INTO jobs (
        id, title, company, description, salary_min, salary_max, salary_currency,
        location, remote_type, job_type, experience_level, tech_stack, requirements,
        benefits, source_platform, source_url, referral_link, posted_date, status, priority
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    execute(sql, [
      id,
      jobData.title,
      jobData.company,
      jobData.description || null,
      jobData.salary_min || null,
      jobData.salary_max || null,
      jobData.salary_currency || 'USD',
      jobData.location || 'Remote',
      jobData.remote_type || 'fully_remote',
      jobData.job_type || 'full_time',
      jobData.experience_level || 'mid',
      JSON.stringify(jobData.tech_stack || []),
      JSON.stringify(jobData.requirements || []),
      JSON.stringify(jobData.benefits || []),
      jobData.source_platform,
      jobData.source_url || null,
      jobData.referral_link,
      jobData.posted_date || now,
      jobData.status || 'active',
      jobData.priority || 0
    ]);

    return this.findById(id);
  }

  /**
   * Find job by ID
   */
  static findById(id) {
    const sql = 'SELECT * FROM jobs WHERE id = ?';
    const job = queryOne(sql, [id]);

    if (job) {
      return this.parseJob(job);
    }
    return null;
  }

  /**
   * Find all jobs with optional filters
   */
  static findAll(filters = {}) {
    let sql = 'SELECT * FROM jobs WHERE 1=1';
    const params = [];

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.source_platform) {
      sql += ' AND source_platform = ?';
      params.push(filters.source_platform);
    }

    if (filters.experience_level) {
      sql += ' AND experience_level = ?';
      params.push(filters.experience_level);
    }

    if (filters.remote_type) {
      sql += ' AND remote_type = ?';
      params.push(filters.remote_type);
    }

    if (filters.min_salary) {
      sql += ' AND salary_min >= ?';
      params.push(filters.min_salary);
    }

    if (filters.search) {
      sql += ' AND (title LIKE ? OR company LIKE ? OR description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Ordering
    const orderBy = filters.orderBy || 'posted_date';
    const order = filters.order || 'DESC';
    sql += ` ORDER BY ${orderBy} ${order}`;

    // Pagination
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);

      if (filters.offset) {
        sql += ' OFFSET ?';
        params.push(filters.offset);
      }
    }

    const jobs = query(sql, params);
    return jobs.map(job => this.parseJob(job));
  }

  /**
   * Update job
   */
  static update(id, updates) {
    const now = new Date().toISOString();
    const allowedFields = [
      'title', 'company', 'description', 'salary_min', 'salary_max', 'salary_currency',
      'location', 'remote_type', 'job_type', 'experience_level', 'tech_stack',
      'requirements', 'benefits', 'source_url', 'referral_link', 'status', 'priority'
    ];

    const fields = [];
    const values = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);

        // Stringify arrays
        if (['tech_stack', 'requirements', 'benefits'].includes(key) && Array.isArray(updates[key])) {
          values.push(JSON.stringify(updates[key]));
        } else {
          values.push(updates[key]);
        }
      }
    });

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    const sql = `UPDATE jobs SET ${fields.join(', ')} WHERE id = ?`;
    execute(sql, values);

    return this.findById(id);
  }

  /**
   * Delete job (soft delete by setting status to archived)
   */
  static delete(id) {
    const sql = 'UPDATE jobs SET status = ?, updated_at = ? WHERE id = ?';
    execute(sql, ['archived', new Date().toISOString(), id]);
    return { success: true };
  }

  /**
   * Hard delete job
   */
  static hardDelete(id) {
    const sql = 'DELETE FROM jobs WHERE id = ?';
    execute(sql, [id]);
    return { success: true };
  }

  /**
   * Get job statistics
   */
  static getStats() {
    const stats = {
      total: queryOne('SELECT COUNT(*) as count FROM jobs')?.count || 0,
      active: queryOne('SELECT COUNT(*) as count FROM jobs WHERE status = ?', ['active'])?.count || 0,
      filled: queryOne('SELECT COUNT(*) as count FROM jobs WHERE status = ?', ['filled'])?.count || 0,
      byPlatform: query(`
        SELECT source_platform, COUNT(*) as count
        FROM jobs
        GROUP BY source_platform
      `),
      byExperienceLevel: query(`
        SELECT experience_level, COUNT(*) as count
        FROM jobs
        WHERE status = 'active'
        GROUP BY experience_level
      `)
    };

    return stats;
  }

  /**
   * Parse job object (convert JSON strings to objects)
   */
  static parseJob(job) {
    if (!job) return null;

    return {
      ...job,
      tech_stack: this.tryParse(job.tech_stack),
      requirements: this.tryParse(job.requirements),
      benefits: this.tryParse(job.benefits)
    };
  }

  /**
   * Safely parse JSON string
   */
  static tryParse(jsonString) {
    try {
      return jsonString ? JSON.parse(jsonString) : [];
    } catch {
      return [];
    }
  }
}

export default Job;
