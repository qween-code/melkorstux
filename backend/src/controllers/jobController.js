/**
 * Job Controller
 * Handles HTTP requests for job operations
 */

import Job from '../models/Job.js';
import Analytics from '../models/Analytics.js';

export const jobController = {
  /**
   * Get all jobs
   * GET /api/jobs
   */
  async getAllJobs(req, res) {
    try {
      const filters = {
        status: req.query.status,
        source_platform: req.query.platform,
        experience_level: req.query.experience,
        remote_type: req.query.remote_type,
        search: req.query.search,
        orderBy: req.query.orderBy || 'posted_date',
        order: req.query.order || 'DESC',
        limit: req.query.limit ? parseInt(req.query.limit) : 50,
        offset: req.query.offset ? parseInt(req.query.offset) : 0
      };

      const jobs = Job.findAll(filters);

      res.json({
        success: true,
        data: jobs,
        count: jobs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get single job
   * GET /api/jobs/:id
   */
  async getJobById(req, res) {
    try {
      const job = Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }

      // Track impression
      Analytics.track({
        job_id: job.id,
        platform: req.query.platform || 'web',
        metric_type: 'impression',
        user_agent: req.headers['user-agent'],
        ip_address: req.ip,
        referrer: req.headers.referer
      });

      res.json({
        success: true,
        data: job
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Create new job
   * POST /api/jobs
   */
  async createJob(req, res) {
    try {
      const job = Job.create(req.body);

      res.status(201).json({
        success: true,
        data: job,
        message: 'Job created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Update job
   * PUT /api/jobs/:id
   */
  async updateJob(req, res) {
    try {
      const job = Job.update(req.params.id, req.body);

      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }

      res.json({
        success: true,
        data: job,
        message: 'Job updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Delete job (soft delete)
   * DELETE /api/jobs/:id
   */
  async deleteJob(req, res) {
    try {
      const result = Job.delete(req.params.id);

      res.json({
        success: true,
        message: 'Job archived successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get job statistics
   * GET /api/jobs/stats
   */
  async getJobStats(req, res) {
    try {
      const stats = Job.getStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Track job click
   * POST /api/jobs/:id/click
   */
  async trackClick(req, res) {
    try {
      const job = Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }

      // Track click
      Analytics.track({
        job_id: job.id,
        platform: req.body.platform || 'web',
        metric_type: 'click',
        user_agent: req.headers['user-agent'],
        ip_address: req.ip,
        referrer: req.headers.referer,
        utm_source: req.body.utm_source,
        utm_medium: req.body.utm_medium,
        utm_campaign: req.body.utm_campaign
      });

      res.json({
        success: true,
        message: 'Click tracked',
        redirect_url: job.referral_link
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

export default jobController;
