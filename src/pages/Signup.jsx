import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/auth";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    accept: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => { document.title = "Sign up • Wordle"; }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target; // ✅ use 'name'
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setOk("");

    // client-side validations
    if (!form.username.trim()) return setError("Please enter a username.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Please enter a valid email.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password))
      return setError("Password must include letters and numbers.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (!form.accept) return setError("Please accept the Terms to continue.");

    setSubmitting(true);
    try {
      // Backend currently expects only email + password.
      const { token, message } = await AuthAPI.signup({
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
        // If your backend supports it, also send username here.
        // username: form.username.trim(),
      });

      // Token already set in axios via AuthAPI; persist locally if you want:
      localStorage.setItem("token", token);

      setOk(message || "Account created! Redirecting…");
      setTimeout(() => nav("/game", { replace: true }), 1200);
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form className="auth-card" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username" name="username" type="text" placeholder="JaneDoe"
            value={form.username} onChange={onChange} required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" placeholder="you@example.com"
            value={form.email} onChange={onChange} required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <PasswordInput
            id="password" name="password" placeholder="8+ chars, letters & numbers"
            value={form.password} onChange={onChange} required
          />
        </div>

        <div className="field">
          <label htmlFor="confirm">Confirm password</label>
          <PasswordInput
            id="confirm" name="confirm" placeholder="re-enter password"
            value={form.confirm} onChange={onChange} required
          />
        </div>

        <label className="checkbox">
          <input type="checkbox" name="accept" checked={form.accept} onChange={onChange} />
          <span>
            I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms</a>
          </span>
        </label>

        {error && <div className="error">{error}</div>}
        {ok && <div className="ok">{ok}</div>}

        <button className="btn primary" disabled={submitting}>
          {submitting ? "Creating..." : "Create account"}
        </button>

        <p className="muted center">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

/* ---------- shared (local) ---------- */
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
