import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler =(event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
     event.preventDefault()
     let newUrl = url;
     if (currState==="Login") {
      newUrl += "/api/user/login"
     }
     else{
      newUrl += "/api/user/register"
     }

     const response = await axios.post(newUrl,data);

     if (response.data.success) {
       setToken(response.data.token);
       localStorage.setItem("token",response.data.token);
       setShowLogin(false)
     }
     else{
      alert(response.data.message)
     }
  }
 
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle forgot password request
  const handleReset = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending reset email.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{showForgotPassword ? "Forgot Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        {/* 🟢 Forgot Password Form */}
        {showForgotPassword ? (
          <>
            <p>Enter your email to reset your password</p>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button" onClick={handleReset}>Send Reset Link</button>
            <p>{message}</p>
            <p className="back-to-login" onClick={() => setShowForgotPassword(false)}>
              Back to Login
            </p>
          </>
        ) : (
          <>
            {/* 🟢 Login or Signup Form */}
            <div className="login-popup-inputs">
              {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
              <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
            </div>
            <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>

            {/* 🟢 Forgot Password Link */}
            {currState === "Login" && (
              <p className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                Forgot Password?
              </p>
            )}

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState === "Login" ? (
              <p>
                Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;


