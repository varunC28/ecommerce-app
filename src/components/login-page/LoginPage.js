import React from "react";
import { useState, useEffect } from "react";
import "./LoginPage.css";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import {useAuth }  from '../../contexts/AuthContext';

function LoginPage() {
  const {authUser, 
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin
  } = useAuth();

  const navigate = useNavigate();
  const [logged, setLogged] = useState(0);
  const ecommerceurl = "http://localhost:8080/api/auth";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setAuthUser(null);
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("IsAdmin");
    localStorage.removeItem("AuthUser");},[]);


  const handleLogin = async () => {
    const formData = new FormData(document.getElementById("loginform"));
    try {
      //alert(formData.get("fname"));
      const response = await fetch(ecommerceurl + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      console.log(response);
      if (!response.ok) {
        console.log(4);
        throw new Error("Error");
      }
      const data = await response.json();
      console.log(5);
      console.log(data);
      setLogged(1);
      setIsLoggedIn(true);
      // We are setting the user role by default to Admin we need to change this if backend code returns proper role
      setIsAdmin(true);
      setAuthUser({"USERTOKEN":data['token']});
      localStorage.setItem("IsLoggedIn",true);
      localStorage.setItem("IsAdmin",true);
      localStorage.setItem("AuthUser",JSON.stringify({"USERTOKEN":data['token']}));
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };

  // address later - isLoggedIn and isAdmin is never used.
  useEffect(() => {
    if (logged === 1) {
      localStorage.setItem("isLoggedIn", true);
      {
        var isLoggedIn =
          localStorage.getItem("isLoggedIn") === "true" ? true : false;
        var isAdmin = localStorage.getItem("isAdmin") === "true" ? true : false;
      }

      navigate("/home");
    }
  }, [logged]);

  return (
    <div className="login-container">

      <div className="logo-container">
        <LockIcon className="lock-logo" />
        <h2>Sign In</h2>
      </div>

      <form id="loginform">
        <div className="form-container">
          <input
            type="email"
            name="username"
            placeholder="Email Address *"
            autoComplete="current-username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            SIGN IN
          </button>
          <Link to="/signup" id="signup-link">
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>

      <div className="footer-copyright">
        <p>Copyright © <a href="https://www.upgrad.com">upGrad</a> 2021.</p>
      </div>

    </div>
  );
}

export default LoginPage;
