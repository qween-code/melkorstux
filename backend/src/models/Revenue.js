/**
 * Revenue Model
 * Tracks earnings from referrals
 */

import { nanoid } from 'nanoid';
import { query, queryOne, execute } from '../db/connection.js';

export class Revenue {
  /**
   * Record a new commission
   */
  static create(revenueData) {
    const id = nanoid();

    const sql = `
      INSERT INTO revenue (
        id, job_id, candidate_name, candidate_email, hire_date,
        commission_amount, commission_currency, payment_status,
        platform, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    execute(sql, [
      id,
      revenueData.job_id,
      revenueData.candidate_name || null,
      revenueData.candidate_email || null,
      revenueData.hire_date,
      revenueData.commission_amount,
      revenueData.commission_currency || 'USD',
      revenueData.payment_status || 'pending',
      revenueData.platform,
      revenueData.notes || null
    ]);

    return this.findById(id);
  }

  /**
   * Find by ID
   */
  static findById(id) {
    const sql = 'SELECT * FROM revenue WHERE id = ?';
    return queryOne(sql, [id]);
  }

  /**
   * Find all revenue records
   */
  static findAll(filters = {}) {
    let sql = 'SELECT * FROM revenue WHERE 1=1';
    const params = [];

    if (filters.payment_status) {
      sql += ' AND payment_status = ?';
      params.push(filters.payment_status);
    }

    if (filters.platform) {
      sql += ' AND platform = ?';
      params.push(filters.platform);
    }

    if (filters.job_id) {
      sql += ' AND job_id = ?';
      params.push(filters.job_id);
    }

    sql += ' ORDER BY hire_date DESC';

    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);

      if (filters.offset) {
        sql += ' OFFSET ?';
        params.push(filters.offset);
      }
    }

    return query(sql, params);
  }

  /**
   * Update revenue record
   */
  static update(id, updates) {
    const now = new Date().toISOString();
    const allowedFields = [
      'candidate_name', 'candidate_email', 'commission_amount',
      'payment_status', 'payment_date', 'notes'
    ];

    const fields = [];
    const values = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    const sql = `UPDATE revenue SET ${fields.join(', ')} WHERE id = ?`;
    execute(sql, values);

    return this.findById(id);
  }

  /**
   * Mark as paid
   */
  static markAsPaid(id, paymentDate = null) {
    const date = paymentDate || new Date().toISOString();
    const sql = `
      UPDATE revenue
      SET payment_status = 'paid', payment_date = ?, updated_at = ?
      WHERE id = ?
    `;

    execute(sql, [date, date, id]);
    return this.findById(id);
  }

  /**
   * Get revenue statistics
   */
  static getStats(dateRange = {}) {
    let sql = 'SELECT * FROM revenue WHERE 1=1';
    const params = [];

    if (dateRange.start) {
      sql += ' AND hire_date >= ?';
      params.push(dateRange.start);
    }

    if (dateRange.end) {
      sql += ' AND hire_date <= ?';
      params.push(dateRange.end);
    }

    const revenues = query(sql, params);

    // Calculate statistics
    const stats = {
      total_revenue: 0,
      pending_revenue: 0,
      paid_revenue: 0,
      total_hires: revenues.length,
      by_platform: {},
      by_status: {
        pending: 0,
        processing: 0,
        paid: 0,
        failed: 0
      }
    };

    revenues.forEach(rev => {
      stats.total_revenue += rev.commission_amount;

      if (rev.payment_status === 'paid') {
        stats.paid_revenue += rev.commission_amount;
      } else if (rev.payment_status === 'pending' || rev.payment_status === 'processing') {
        stats.pending_revenue += rev.commission_amount;
      }

      // By platform
      if (!stats.by_platform[rev.platform]) {
        stats.by_platform[rev.platform] = {
          count: 0,
          revenue: 0
        };
      }
      stats.by_platform[rev.platform].count++;
      stats.by_platform[rev.platform].revenue += rev.commission_amount;

      // By status
      stats.by_status[rev.payment_status]++;
    });

    // Round to 2 decimal places
    stats.total_revenue = Math.round(stats.total_revenue * 100) / 100;
    stats.pending_revenue = Math.round(stats.pending_revenue * 100) / 100;
    stats.paid_revenue = Math.round(stats.paid_revenue * 100) / 100;

    return stats;
  }

  /**
   * Get monthly revenue breakdown
   */
  static getMonthlyRevenue(months = 12) {
    const sql = `
      SELECT
        strftime('%Y-%m', hire_date) as month,
        SUM(commission_amount) as revenue,
        COUNT(*) as hires
      FROM revenue
      WHERE hire_date >= datetime('now', '-${months} months')
      GROUP BY strftime('%Y-%m', hire_date)
      ORDER BY month DESC
    `;

    return query(sql, []);
  }

  /**
   * Get top earning jobs
   */
  static getTopJobs(limit = 10) {
    const sql = `
      SELECT
        j.id,
        j.title,
        j.company,
        SUM(r.commission_amount) as total_revenue,
        COUNT(r.id) as total_hires
      FROM revenue r
      JOIN jobs j ON r.job_id = j.id
      GROUP BY r.job_id
      ORDER BY total_revenue DESC
      LIMIT ?
    `;

    return query(sql, [limit]);
  }

  /**
   * Delete revenue record
   */
  static delete(id) {
    const sql = 'DELETE FROM revenue WHERE id = ?';
    execute(sql, [id]);
    return { success: true };
  }
}

export default Revenue;
