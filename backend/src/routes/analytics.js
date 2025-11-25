/**
 * Analytics Routes
 */

import express from 'express';
import analyticsController from '../controllers/analyticsController.js';

const router = express.Router();

// Get dashboard overview
router.get('/dashboard', analyticsController.getDashboard);

// Get job analytics
router.get('/jobs/:id', analyticsController.getJobAnalytics);

// Get platform performance
router.get('/platforms', analyticsController.getPlatformPerformance);

// Get conversion funnel
router.get('/funnel', analyticsController.getConversionFunnel);

// Get top performing content
router.get('/top-content', analyticsController.getTopContent);

// Get daily statistics
router.get('/daily', analyticsController.getDailyStats);

// Get revenue statistics
router.get('/revenue', analyticsController.getRevenueStats);

// Track custom event
router.post('/track', analyticsController.trackEvent);

export default router;
