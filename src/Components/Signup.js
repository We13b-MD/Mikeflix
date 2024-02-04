import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaUser } from "react-icons/fa";
import "../Cssfiles/signup.css";
import { useUser } from "../CreateContext/userContext";

//http://localhost:5000/auth/google/callback
// http://localhost:5000/oauth2/redirect/callback

function Signup() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const [formdata, setFormmdata] = useState({
    username: "",
    password: "",
    name: "",
  });

  function handleChange(e) {
    setFormmdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (response.ok) {
        alert("Signup successful");
        setUser(formdata.username);
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      } else {
        alert("Username already exists");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during signup error:", error);
    }
    setLoading(false);
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
        setUser(formdata.name);
        Navigate("/movies");
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

  /*const handleFacebookSuccess = async(responseFacebook)=>{
try{

  const {facebookId, email, username} = responseFacebook;
  const userData = {facebookId, email, username};

  const serverResponse = await fetch(
    "http://localhost:5000/auth/facebook/callback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  )

  if (serverResponse.ok) {
    alert("Login successful");
    const movieUrl = '/movies'
    Navigate(movieUrl);
  } else {
    alert("Error signing you in");
  }
}

catch(error){
console.log('Error during facebook sign in:', error)
}
  }*/

  return loading ? (
    <div className="Loader"></div>
  ) : (
    <div className="form-background">
      <form onSubmit={handleSubmit}>
        <div class="wrapper">
          <h2> Sign Up</h2>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <FaUser className="user" />
          </div>
          <br></br>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="button2">
            <button className="button1" type="submit">
              <span className="login">Sign up</span>
            </button>
          </div>

          <h4 className="orsign">OR Continue with</h4>
          <div>
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
            <div className="button1"></div>
          </div>
          <div className="register">
            <p className="account"> Have an account</p>
            <Link className="Login" to="/login">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
