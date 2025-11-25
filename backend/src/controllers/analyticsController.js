/**
 * Analytics Controller
 * Handles analytics and reporting requests
 */

import Analytics from '../models/Analytics.js';
import Revenue from '../models/Revenue.js';
import Job from '../models/Job.js';
import Content from '../models/Content.js';

export const analyticsController = {
  /**
   * Get dashboard overview
   * GET /api/analytics/dashboard
   */
  async getDashboard(req, res) {
    try {
      const dateRange = {
        start: req.query.start || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: req.query.end || new Date().toISOString()
      };

      // Get various stats
      const jobStats = Job.getStats();
      const contentStats = Content.getStats();
      const revenueStats = Revenue.getStats(dateRange);
      const conversionFunnel = Analytics.getConversionFunnel(dateRange);
      const platformPerformance = Analytics.getPlatformPerformance(dateRange);
      const dailyStats = Analytics.getDailyStats(30);

      res.json({
        success: true,
        data: {
          jobs: jobStats,
          content: contentStats,
          revenue: revenueStats,
          funnel: conversionFunnel,
          platforms: platformPerformance,
          daily: dailyStats,
          date_range: dateRange
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get job-specific analytics
   * GET /api/analytics/jobs/:id
   */
  async getJobAnalytics(req, res) {
    try {
      const dateRange = {
        start: req.query.start,
        end: req.query.end
      };

      const analytics = Analytics.getJobAnalytics(req.params.id, dateRange);

      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get platform performance
   * GET /api/analytics/platforms
   */
  async getPlatformPerformance(req, res) {
    try {
      const dateRange = {
        start: req.query.start,
        end: req.query.end
      };

      const performance = Analytics.getPlatformPerformance(dateRange);

      res.json({
        success: true,
        data: performance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get conversion funnel
   * GET /api/analytics/funnel
   */
  async getConversionFunnel(req, res) {
    try {
      const dateRange = {
        start: req.query.start,
        end: req.query.end
      };

      const funnel = Analytics.getConversionFunnel(dateRange);

      res.json({
        success: true,
        data: funnel
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get top performing content
   * GET /api/analytics/top-content
   */
  async getTopContent(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const topContent = Analytics.getTopContent(limit);

      res.json({
        success: true,
        data: topContent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get daily statistics
   * GET /api/analytics/daily
   */
  async getDailyStats(req, res) {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 30;
      const stats = Analytics.getDailyStats(days);

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
   * Track custom event
   * POST /api/analytics/track
   */
  async trackEvent(req, res) {
    try {
      const event = Analytics.track(req.body);

      res.json({
        success: true,
        data: event,
        message: 'Event tracked successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get revenue statistics
   * GET /api/analytics/revenue
   */
  async getRevenueStats(req, res) {
    try {
      const dateRange = {
        start: req.query.start,
        end: req.query.end
      };

      const stats = Revenue.getStats(dateRange);
      const monthly = Revenue.getMonthlyRevenue(12);
      const topJobs = Revenue.getTopJobs(10);

      res.json({
        success: true,
        data: {
          summary: stats,
          monthly: monthly,
          top_jobs: topJobs
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

export default analyticsController;
