import React from "react";
import { useState, useEffect } from "react";
import "./LoginPage.css";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { apiConfig } from "../../config";

function LoginPage() {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useAuth();

  const navigate = useNavigate();
  const [logged, setLogged] = useState(0);
  const ecommerceurl = apiConfig.apiBaseUrl + "/auth";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  useEffect(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.clear();
  }, []);

  const handleLogin = async () => {
    const formData = new FormData(document.getElementById("loginform"));
    try {
      if (formData.get("username").trim() === "") {
        alert("Enter Email ID");
        //document.getElementById("username").focus();
        return;
      }
      if (!validateEmail(formData.get("username").trim())) {
        alert("Enter Proper Email ID");
        return;
      }
      if (formData.get("password").trim() === "") {
        alert("Enter Password");
        return;
      }
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

      if (!response.ok) {
        throw new Error("Failed to login, please try again");
      }
      const headers = response.headers;
      // Convert headers into an object
      headers.forEach((value, key) => {
        console.log(key + " : " + value);
      });
      const data = await response.json();
      console.log(5);
      console.log(data);
      setLogged(1);
      setIsLoggedIn(true);
      // localstorage items (IsAdmin,IsLoggedIn, USERTOKEN, USERID, USERROLES  )
      // We are setting the user role by default to Admin we need to change this if backend code returns proper role
      var x = data["roles"];
      setIsAdmin(false);
      localStorage.setItem("IsAdmin", false);
      console.log(x);
      for (var y = 0; y < x.length; y++) {
        if (x[y] === "ADMIN") {
          setIsAdmin(true);
          localStorage.setItem("IsAdmin", "true");
        }
      }

      //setAuthUser({"USERTOKEN":data['token']});
      const token = response.headers.get("x-auth-token");
      if (!token) {
        alert("Login failed: No authentication token received. Please try again or contact support.");
        return;
      }
      localStorage.setItem("IsLoggedIn", true);
      localStorage.setItem("USERTOKEN", token);
      localStorage.setItem("USERID", data["id"]);
      localStorage.setItem("USEREMAIL", data["email"]);
      localStorage.setItem("USERROLES", data["roles"]);

      console.log(data["id"]);
      console.log(data["email"]);

      console.log(data["roles"]);
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
        var isAdmin = localStorage.getItem("IsAdmin") === "true" ? true : false;
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
          <br />
          <div style={{ fontSize: '12px', color: '#888', textAlign: 'left' }}>
            For testing purpose<br />Username : user@test.com<br />Password : User123!
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
