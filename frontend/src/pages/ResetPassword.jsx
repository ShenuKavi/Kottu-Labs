import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";


const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/reset-password", { token, newPassword: password });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="reset-password">
      <h2>Set a New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;