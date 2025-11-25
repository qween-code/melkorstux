/**
 * Content Routes
 */

import express from 'express';
import contentController from '../controllers/contentController.js';

const router = express.Router();

// Get all content
router.get('/', contentController.getAllContent);

// Get content statistics (must be before /:id route)
router.get('/stats', contentController.getContentStats);

// Get scheduled content
router.get('/scheduled', contentController.getScheduledContent);

// Get single content
router.get('/:id', contentController.getContentById);

// Create content
router.post('/', contentController.createContent);

// Generate content for a job
router.post('/generate', contentController.generateContent);

// Update content
router.put('/:id', contentController.updateContent);

// Delete content
router.delete('/:id', contentController.deleteContent);

// Mark as posted
router.post('/:id/posted', contentController.markAsPosted);

export default router;
