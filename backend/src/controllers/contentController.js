/**
 * Content Controller
 * Manages social media content creation and scheduling
 */

import Content from '../models/Content.js';
import { contentGenerator } from '../services/contentGenerator.js';

export const contentController = {
  /**
   * Get all content
   * GET /api/content
   */
  async getAllContent(req, res) {
    try {
      const filters = {
        platform: req.query.platform,
        status: req.query.status,
        job_id: req.query.job_id,
        limit: req.query.limit ? parseInt(req.query.limit) : 50,
        offset: req.query.offset ? parseInt(req.query.offset) : 0
      };

      const content = Content.findAll(filters);

      res.json({
        success: true,
        data: content,
        count: content.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get content by ID
   * GET /api/content/:id
   */
  async getContentById(req, res) {
    try {
      const content = Content.findById(req.params.id);

      if (!content) {
        return res.status(404).json({
          success: false,
          error: 'Content not found'
        });
      }

      res.json({
        success: true,
        data: content
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Create content
   * POST /api/content
   */
  async createContent(req, res) {
    try {
      const content = Content.create(req.body);

      res.status(201).json({
        success: true,
        data: content,
        message: 'Content created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Generate content for a job
   * POST /api/content/generate
   */
  async generateContent(req, res) {
    try {
      const { job_id, platform, template_id } = req.body;

      if (!job_id || !platform) {
        return res.status(400).json({
          success: false,
          error: 'job_id and platform are required'
        });
      }

      const generatedContent = await contentGenerator.generate({
        job_id,
        platform,
        template_id
      });

      // Save generated content
      const content = Content.create({
        job_id,
        platform,
        content_type: 'single_post',
        content_text: generatedContent.text,
        hashtags: generatedContent.hashtags,
        status: 'draft'
      });

      res.status(201).json({
        success: true,
        data: content,
        message: 'Content generated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Update content
   * PUT /api/content/:id
   */
  async updateContent(req, res) {
    try {
      const content = Content.update(req.params.id, req.body);

      if (!content) {
        return res.status(404).json({
          success: false,
          error: 'Content not found'
        });
      }

      res.json({
        success: true,
        data: content,
        message: 'Content updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Delete content
   * DELETE /api/content/:id
   */
  async deleteContent(req, res) {
    try {
      Content.delete(req.params.id);

      res.json({
        success: true,
        message: 'Content deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get scheduled content
   * GET /api/content/scheduled
   */
  async getScheduledContent(req, res) {
    try {
      const content = Content.getScheduled();

      res.json({
        success: true,
        data: content,
        count: content.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Mark content as posted
   * POST /api/content/:id/posted
   */
  async markAsPosted(req, res) {
    try {
      const { post_url } = req.body;

      const content = Content.markAsPosted(req.params.id, post_url);

      res.json({
        success: true,
        data: content,
        message: 'Content marked as posted'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  /**
   * Get content statistics
   * GET /api/content/stats
   */
  async getContentStats(req, res) {
    try {
      const stats = Content.getStats();

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
  }
};

export default contentController;
