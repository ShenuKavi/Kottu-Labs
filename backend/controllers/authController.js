import User from '../models/userModel.js'; 
import jwt from 'jsonwebtoken';
import transporter from '../config/email.js';
import bcrypt from 'bcrypt';

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      // Check if the email exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'No user found with that email' });
      }
  
      // Create a reset password token that expires in 15 minutes
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
      // Store the token in the user's record
      user.resetToken = token;
      user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
      await user.save();
  
      // Create reset password link
      const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
      // Send email to the user with the reset link
      await transporter.sendMail({
        to: email,
        subject: 'Password Reset Link',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link will expire in 15 minutes.</p>`,
      });
  
      res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Reset Password Controller
  export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }, // Token must not be expired
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password and remove the reset token and expiry
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.json({ message: 'Password has been successfully reset' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };