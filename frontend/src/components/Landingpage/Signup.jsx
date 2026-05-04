import React, { useState } from "react";
import "./Login.css"; // Shared auth styles
import logo from "../../assets/header_logo.png";

const Signup = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const setRole = (role) => {
    setForm({ ...form, role });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(form.password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(form.password)) {
      setError("Password must contain at least one number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      // Store tokens
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      setSuccess("Account created! Redirecting…");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="auth-shape shape-1" />
        <div className="auth-shape shape-2" />
        <div className="auth-shape shape-3" />
      </div>

      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div className="auth-card-header">
          <a href="/">
            <img src={logo} alt="Relay Logo" className="auth-logo" />
          </a>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start leaping your career today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Role toggle */}
          <div className="form-group">
            <label>I am a</label>
            <div className="role-toggle">
              <button
                type="button"
                className={`role-option ${form.role === "student" ? "active" : ""}`}
                onClick={() => setRole("student")}
              >
                🎓 Student
              </button>
              <button
                type="button"
                className={`role-option ${form.role === "HR" ? "active" : ""}`}
                onClick={() => setRole("HR")}
              >
                💼 HR / Recruiter
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="full_name">Full name</label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
            <span className="password-hint">
              8+ chars · one uppercase · one number
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button
            type="submit"
            className="auth-btn-primary"
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="auth-footer-text">
          Already have an account?{" "}
          <a href="/login" className="auth-link">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;