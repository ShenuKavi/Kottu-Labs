import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      // Provide more specific error messages
      if (error.response) {
        setMessage(error.response.data.message || "Error sending reset email.");
      } else if (error.request) {
        setMessage("No response from the server. Please try again later.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="forgot-password">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;