import React, { useState, useEffect } from "react";
import "./SignupPage.css";

import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { apiConfig } from "../../config";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pwd: "",
    conpwd: "",
    contact: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [logged, setLogged] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const ecommerceurl = apiConfig.apiBaseUrl + "/auth";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const validateForm = () => {
    const newErrors = {};
    if (formData.fname.trim() === "") {
      newErrors.fname = "First name is required.";
    }
    if (formData.lname.trim() === "") {
      newErrors.lname = "Last name is required.";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
    if (formData.pwd.trim() === "") {
      newErrors.pwd = "Password is required.";
    } else {
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(formData.pwd.trim())) {
        newErrors.pwd = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
      }
    }
    if (formData.conpwd.trim() === "") {
      newErrors.conpwd = "Confirm password is required.";
    } else if (formData.conpwd.trim() !== formData.pwd.trim()) {
      newErrors.conpwd = "Passwords do not match.";
    }
    if (formData.contact.trim() === "" || formData.contact.trim().length !== 10) {
      newErrors.contact = "Contact number must be 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }
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
          role: isAdmin ? ["admin"] : ["USER"],
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
      const data = await response.json();
      setLogged(1);
    } catch (error) {
      alert(error.message || "Failed to sign up, please try again");
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
          {errors.fname && <div className="error-message">{errors.fname}</div>}
          <input
            type="text"
            name="lname"
            placeholder="Last Name *"
            autoComplete="username"
            required
            value={formData.lname}
            onChange={handleChange}
          />
          {errors.lname && <div className="error-message">{errors.lname}</div>}
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
          <input
            type="password"
            name="pwd"
            placeholder="Password *"
            autoComplete="new-password"
            required
            value={formData.pwd}
            onChange={handleChange}
          />
          {errors.pwd && <div className="error-message">{errors.pwd}</div>}
          <input
            type="password"
            name="conpwd"
            placeholder="Confirm Password *"
            autoComplete="new-password"
            value={formData.conpwd}
            onChange={handleChange}
            required
          />
          {errors.conpwd && <div className="error-message">{errors.conpwd}</div>}
          <input
            type="number"
            name="contact"
            placeholder="Contact Number *"
            autoComplete="text"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <div className="error-message">{errors.contact}</div>}

          {/* Removed admin checkbox and label */}

          <button type="button" onClick={handleSignUp}>
            SIGN UP
          </button>
          <Link to="/login" id="login-link">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
