/**
 * Job Routes
 */

import express from 'express';
import jobController from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get job statistics (must be before /:id route)
router.get('/stats', jobController.getJobStats);

// Get single job
router.get('/:id', jobController.getJobById);

// Create new job
router.post('/', jobController.createJob);

// Update job
router.put('/:id', jobController.updateJob);

// Delete job
router.delete('/:id', jobController.deleteJob);

// Track click
router.post('/:id/click', jobController.trackClick);

export default router;
