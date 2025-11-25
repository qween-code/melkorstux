/**
 * Analytics Model
 * Tracks clicks, applications, interviews, and hires
 */

import { nanoid } from 'nanoid';
import { query, queryOne, execute } from '../db/connection.js';

export class Analytics {
  /**
   * Track an event
   */
  static track(eventData) {
    const id = nanoid();

    const sql = `
      INSERT INTO analytics (
        id, job_id, content_id, platform, metric_type, metric_value,
        source_url, user_agent, ip_address, referrer,
        utm_source, utm_medium, utm_campaign, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    execute(sql, [
      id,
      eventData.job_id || null,
      eventData.content_id || null,
      eventData.platform,
      eventData.metric_type, // impression, click, application, interview, hire
      eventData.metric_value || 1,
      eventData.source_url || null,
      eventData.user_agent || null,
      eventData.ip_address || null,
      eventData.referrer || null,
      eventData.utm_source || null,
      eventData.utm_medium || null,
      eventData.utm_campaign || null,
      eventData.metadata ? JSON.stringify(eventData.metadata) : null
    ]);

    return this.findById(id);
  }

  /**
   * Find by ID
   */
  static findById(id) {
    const sql = 'SELECT * FROM analytics WHERE id = ?';
    const event = queryOne(sql, [id]);

    if (event) {
      return this.parseEvent(event);
    }
    return null;
  }

  /**
   * Get analytics for a specific job
   */
  static getJobAnalytics(jobId, dateRange = {}) {
    let sql = `
      SELECT
        metric_type,
        COUNT(*) as count,
        SUM(metric_value) as total_value
      FROM analytics
      WHERE job_id = ?
    `;

    const params = [jobId];

    if (dateRange.start) {
      sql += ' AND created_at >= ?';
      params.push(dateRange.start);
    }

    if (dateRange.end) {
      sql += ' AND created_at <= ?';
      params.push(dateRange.end);
    }

    sql += ' GROUP BY metric_type';

    const results = query(sql, params);

    // Format results
    const analytics = {
      impressions: 0,
      clicks: 0,
      applications: 0,
      interviews: 0,
      hires: 0
    };

    results.forEach(row => {
      analytics[row.metric_type + 's'] = row.count;
    });

    // Calculate conversion rates
    analytics.ctr = analytics.impressions > 0
      ? ((analytics.clicks / analytics.impressions) * 100).toFixed(2)
      : 0;

    analytics.application_rate = analytics.clicks > 0
      ? ((analytics.applications / analytics.clicks) * 100).toFixed(2)
      : 0;

    analytics.interview_rate = analytics.applications > 0
      ? ((analytics.interviews / analytics.applications) * 100).toFixed(2)
      : 0;

    analytics.hire_rate = analytics.interviews > 0
      ? ((analytics.hires / analytics.interviews) * 100).toFixed(2)
      : 0;

    return analytics;
  }

  /**
   * Get platform performance
   */
  static getPlatformPerformance(dateRange = {}) {
    let sql = `
      SELECT
        platform,
        metric_type,
        COUNT(*) as count
      FROM analytics
      WHERE 1=1
    `;

    const params = [];

    if (dateRange.start) {
      sql += ' AND created_at >= ?';
      params.push(dateRange.start);
    }

    if (dateRange.end) {
      sql += ' AND created_at <= ?';
      params.push(dateRange.end);
    }

    sql += ' GROUP BY platform, metric_type ORDER BY platform, metric_type';

    return query(sql, params);
  }

  /**
   * Get daily statistics
   */
  static getDailyStats(days = 30) {
    const sql = `
      SELECT
        DATE(created_at) as date,
        metric_type,
        COUNT(*) as count
      FROM analytics
      WHERE created_at >= datetime('now', '-${days} days')
      GROUP BY DATE(created_at), metric_type
      ORDER BY date DESC
    `;

    return query(sql, []);
  }

  /**
   * Get conversion funnel
   */
  static getConversionFunnel(dateRange = {}) {
    let sql = `
      SELECT
        metric_type,
        COUNT(*) as count
      FROM analytics
      WHERE 1=1
    `;

    const params = [];

    if (dateRange.start) {
      sql += ' AND created_at >= ?';
      params.push(dateRange.start);
    }

    if (dateRange.end) {
      sql += ' AND created_at <= ?';
      params.push(dateRange.end);
    }

    sql += ' GROUP BY metric_type';

    const results = query(sql, params);

    // Build funnel
    const funnel = {
      impression: 0,
      click: 0,
      application: 0,
      interview: 0,
      hire: 0
    };

    results.forEach(row => {
      funnel[row.metric_type] = row.count;
    });

    return funnel;
  }

  /**
   * Get top performing content
   */
  static getTopContent(limit = 10) {
    const sql = `
      SELECT
        c.id,
        c.platform,
        c.content_text,
        COUNT(a.id) as total_events,
        SUM(CASE WHEN a.metric_type = 'click' THEN 1 ELSE 0 END) as clicks,
        SUM(CASE WHEN a.metric_type = 'application' THEN 1 ELSE 0 END) as applications
      FROM content c
      LEFT JOIN analytics a ON c.id = a.content_id
      WHERE c.status = 'posted'
      GROUP BY c.id
      ORDER BY total_events DESC
      LIMIT ?
    `;

    return query(sql, [limit]);
  }

  /**
   * Parse event object
   */
  static parseEvent(event) {
    if (!event) return null;

    return {
      ...event,
      metadata: this.tryParse(event.metadata)
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

export default Analytics;
