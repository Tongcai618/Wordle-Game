import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api/auth";

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from && location.state.from.pathname) || "/game";

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { document.title = "Login • Wordle"; }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // simple client-side validation
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!form.password) {
      setError("Password is required.");
      return;
    }

    setSubmitting(true);
    try {
      // call Spring Boot: POST /api/auth/login
      // expected response: { token: "jwt...", user: {...} }
      const { token, user } = await AuthAPI.login({
        email: form.email,
        password: form.password,
      });

       // persist token (and optional user)
       if (form.remember) {
        localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        if (user) sessionStorage.setItem("user", JSON.stringify(user));
      }

      // navigate to the intended page
      nav(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <AuthLayout title="Welcome back">
      <form className="auth-card" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" autoComplete="email"
            placeholder="you@example.com" value={form.email} onChange={onChange} required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <PasswordInput
            id="password" name="password"
            placeholder="••••••••" value={form.password} onChange={onChange} required
          />
        </div>

        <div className="row between">
          <label className="checkbox">
            <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} />
            <span>Remember me</span>
          </label>
          <Link to="/forgot" className="muted">Forgot password?</Link>
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn primary" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="muted center">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

/* ---------- shared helpers/components (local to this file) ---------- */

function AuthLayout({ title, children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-header">
        <img src={"/wordle-icon.png"} alt="Wordle" className="logo-sm" />
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}

function PasswordInput({ value, onChange, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="password-wrap">
      <input
        {...props}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="link small"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

async function safeMessage(res) {
  try {
    const t = await res.text();
    const j = JSON.parse(t);
    return j.error || j.message || t;
  } catch {
    return "";
  }
}
