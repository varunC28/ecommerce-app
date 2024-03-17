import React, { useState, useEffect } from "react";
import "./SignupPage.css";

import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pwd: "",
    contact: "",
  });
  const [logged, setLogged] = useState(0);
  const navigate = useNavigate();
  const ecommerceurl = "http://localhost:8080/api/auth";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(ecommerceurl + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.pwd,
          firstName: formData.fname,
          lastName: formData.lname,
          contactNumber: formData.contact,
          role: ["USER"],
        }),
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      setLogged(1);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (logged === 1) navigate("/login");
  }, [logged, navigate]);

  return (
    <div className="signup-container">
      
      <div className="logo-container">
        <LockIcon className="lock-logo" />
        <h2>Sign Up</h2>
      </div>

      <form>
        <div className="form-container">
          <input
            type="text"
            name="fname"
            placeholder="First Name *"
            autoComplete="username"
            required
            value={formData.fname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name *"
            autoComplete="username"
            required
            value={formData.lname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="pwd"
            placeholder="Password *"
            autoComplete="new-password"
            required
            value={formData.pwd}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password *"
            autoComplete="new-password"
            required
          />

          <button type="button" onClick={handleSignUp}>
            SIGN UP
          </button>
          <Link to="/login" id="login-link">
            Already have an account? Sign in
          </Link>
        </div>
      </form>

      <div className="footer-copyright">
        <p>
          Copyright © <a href="https://www.upgrad.com">upGrad</a> 2021.
        </p>
      </div>

    </div>
  );
}

export default SignUpPage;
