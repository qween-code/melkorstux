/**
 * Content Model
 * Manages social media content generation and scheduling
 */

import { nanoid } from 'nanoid';
import { query, queryOne, execute } from '../db/connection.js';

export class Content {
  /**
   * Create new content
   */
  static create(contentData) {
    const id = nanoid();
    const now = new Date().toISOString();

    const sql = `
      INSERT INTO content (
        id, job_id, platform, content_type, content_text, media_urls,
        hashtags, scheduled_time, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    execute(sql, [
      id,
      contentData.job_id || null,
      contentData.platform,
      contentData.content_type || 'single_post',
      contentData.content_text,
      contentData.media_urls ? JSON.stringify(contentData.media_urls) : null,
      contentData.hashtags || null,
      contentData.scheduled_time || null,
      contentData.status || 'draft'
    ]);

    return this.findById(id);
  }

  /**
   * Find content by ID
   */
  static findById(id) {
    const sql = 'SELECT * FROM content WHERE id = ?';
    const content = queryOne(sql, [id]);

    if (content) {
      return this.parseContent(content);
    }
    return null;
  }

  /**
   * Find all content with filters
   */
  static findAll(filters = {}) {
    let sql = 'SELECT * FROM content WHERE 1=1';
    const params = [];

    if (filters.platform) {
      sql += ' AND platform = ?';
      params.push(filters.platform);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.job_id) {
      sql += ' AND job_id = ?';
      params.push(filters.job_id);
    }

    // Ordering
    sql += ' ORDER BY created_at DESC';

    // Pagination
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);

      if (filters.offset) {
        sql += ' OFFSET ?';
        params.push(filters.offset);
      }
    }

    const contents = query(sql, params);
    return contents.map(content => this.parseContent(content));
  }

  /**
   * Get scheduled content (for automation)
   */
  static getScheduled(beforeTime = null) {
    const time = beforeTime || new Date().toISOString();

    const sql = `
      SELECT * FROM content
      WHERE status = 'scheduled'
      AND scheduled_time <= ?
      ORDER BY scheduled_time ASC
    `;

    const contents = query(sql, [time]);
    return contents.map(content => this.parseContent(content));
  }

  /**
   * Update content
   */
  static update(id, updates) {
    const now = new Date().toISOString();
    const allowedFields = [
      'content_text', 'media_urls', 'hashtags', 'scheduled_time',
      'posted_time', 'status', 'post_url'
    ];

    const fields = [];
    const values = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);

        if (key === 'media_urls' && updates[key]) {
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

    const sql = `UPDATE content SET ${fields.join(', ')} WHERE id = ?`;
    execute(sql, values);

    return this.findById(id);
  }

  /**
   * Mark as posted
   */
  static markAsPosted(id, postUrl) {
    const now = new Date().toISOString();
    const sql = `
      UPDATE content
      SET status = 'posted', posted_time = ?, post_url = ?, updated_at = ?
      WHERE id = ?
    `;

    execute(sql, [now, postUrl, now, id]);
    return this.findById(id);
  }

  /**
   * Delete content
   */
  static delete(id) {
    const sql = 'DELETE FROM content WHERE id = ?';
    execute(sql, [id]);
    return { success: true };
  }

  /**
   * Get content statistics
   */
  static getStats() {
    const stats = {
      total: queryOne('SELECT COUNT(*) as count FROM content')?.count || 0,
      draft: queryOne('SELECT COUNT(*) as count FROM content WHERE status = ?', ['draft'])?.count || 0,
      scheduled: queryOne('SELECT COUNT(*) as count FROM content WHERE status = ?', ['scheduled'])?.count || 0,
      posted: queryOne('SELECT COUNT(*) as count FROM content WHERE status = ?', ['posted'])?.count || 0,
      byPlatform: query(`
        SELECT platform, COUNT(*) as count
        FROM content
        GROUP BY platform
      `)
    };

    return stats;
  }

  /**
   * Parse content object
   */
  static parseContent(content) {
    if (!content) return null;

    return {
      ...content,
      media_urls: this.tryParse(content.media_urls)
    };
  }

  /**
   * Safely parse JSON
   */
  static tryParse(jsonString) {
    try {
      return jsonString ? JSON.parse(jsonString) : null;
    } catch {
      return null;
    }
  }
}

export default Content;
