import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaUser } from "react-icons/fa";

import "../Cssfiles/login.css";
import { useUser } from "../CreateContext/userContext";
function Login() {
  const { login, setUser } = useUser();
  const Navigate = useNavigate();
  const [loading, setIsloading] = useState(false);

  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // Parse response body as JSON

        if (data && data.token) {
          const token = data.token; // Extract the token from the response
          setUser(formData.username);
          // Log the token to the console
          console.log("Token:", token);

          alert("Login successful");
          console.log("Login successful");

          // Redirect or navigate to the movies page after a delay (if needed)
          setTimeout(() => {
            Navigate("/");
          }, 2000);

          login(); //
        } else {
          // Handle scenario if token is not present in the response
          alert("Token not found in the response");
          setIsloading(false);
        }
      } else {
        alert("Invalid username or password");
        setIsloading(false);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setIsloading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { googleId, email, name } = response;
      const userData = { googleId, email, name };

      const serverResponse = await fetch(
        "http://localhost:5000/auth/google/callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (serverResponse.ok) {
        alert("Login successful");
        const HomeUrl = "/";
        Navigate(HomeUrl);
        login();
      } else {
        console.log("Error saving google data");
      }
    } catch (err) {
      console.error("Error during Google sign-in:", err);
    }
  };

  const handleLoginFailed = () => {
    alert("Login Failed");
  };

  return loading ? (
    <div className="Loader"></div>
  ) : (
    <div className="form-background">
      <form onSubmit={handleSubmit}>
        <div class="wrapper">
          <h2> Sign In</h2>
          <div className="input-box">
            <input
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Username"
              required
            />
            <FaUser className="user" />
          </div>
          <br></br>
          <div className="input-box">
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="button1">
            <button className="button1" type="submit">
              <span className="login">Login</span>
            </button>
          </div>

          <h4>OR Login with</h4>
          <p className="pgoogle">
            {" "}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              type="icon"
              shape="circle"
              onError={handleLoginFailed}
              useOneTap
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                ></button>
              )}
            />
            Sign up with Google
          </p>
          <div className="register">
            <p className="account">Don't have an account</p>
            <Link className="register" to="/signup">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
