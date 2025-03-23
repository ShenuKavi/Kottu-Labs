import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password', resetPassword);

export default router; // Export the router using `export default`
