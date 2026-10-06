import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Icon({ name, size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "leaf" && <><path d="M6 15C3 8 10 3 20 4c0 10-6 15-12 11"/><path d="m4 21 11-11"/></>}
    {name === "eye" && <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>}
    {name === "eyeOff" && <><path d="m3 3 18 18M10 5h2c6 0 10 7 10 7a19 19 0 0 1-3 4M6 6a21 21 0 0 0-4 6s4 7 10 7a12 12 0 0 0 5-1"/><path d="M9 9a4 4 0 0 0 6 6"/></>}
    {name === "arrow" && <path d="M5 12h14m-6-6 6 6-6 6"/>}
    {name === "check" && <path d="m5 12 4 4L19 6"/>}
  </svg>;
}

export default function Login({
  onLogin,
  onSocialLogin,
  signupUrl = "/signup",
  forgotPasswordUrl = "/forgot-password",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function runAction(name, action) {
    if (lock.current) return;
    lock.current = true;
    setPending(name);
    setError("");
    try {
      await action();
    } catch {
      setError("We could not sign you in. Please check your details and try again.");
    } finally {
      lock.current = false;
      setPending(null);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (lock.current) return;
    if (typeof onLogin !== "function") {
      setError("Sign-in is currently unavailable. Please try again later.");
      return;
    }
    const data = new FormData(event.currentTarget);
    runAction("email", () => onLogin({
      email: String(data.get("email")).trim(),
      password: String(data.get("password")),
      rememberMe: data.get("rememberMe") === "on",
    }));
  }

  return (
    <main className="fc-page container-fluid p-0" dir="ltr">
      <div className="fc-shell row g-0">
        <section className="fc-story col-lg-6 d-flex flex-column" aria-labelledby="fc-story-title">
          <a className="fc-brand d-inline-flex align-items-center gap-2 text-decoration-none align-self-start" href="/">
            <span className="fc-brand-mark"><Icon name="leaf" size={25}/></span>
            FreshCart<span className="fc-brand-dot">.</span>
          </a>

          <div className="fc-story-body my-auto">
            <p className="fc-kicker mb-3"><span/> A little freshness, every day</p>
            <h1 id="fc-story-title" className="fc-title">Good food.<br/>Better <em>days.</em></h1>
            <p className="fc-description">Fresh favorites and everyday essentials.<br className="d-none d-sm-block"/> A simpler way to fill your basket.</p>

            <figure className="fc-photo-wrap mb-0">
              <img className="fc-photo" src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85" alt="A fresh salad with leafy greens and colorful vegetables" width="1000" height="700"/>
              <figcaption className="fc-photo-label">
                <span className="fc-caption-icon"><Icon name="leaf" size={20}/></span>
                <span><strong>Freshness, thoughtfully chosen</strong><small>A little goodness for your everyday.</small></span>
              </figcaption>
            </figure>

            <div className="fc-benefits d-flex flex-wrap gap-3 mt-3">
              <span><Icon name="check" size={16}/> Fresh essentials</span>
              <span><Icon name="check" size={16}/> Delivered with care</span>
            </div>
          </div>
          <p className="fc-story-foot mb-0">Make room for a fresher everyday.</p>
        </section>

        <section className="fc-form-panel col-lg-6 d-flex align-items-center justify-content-center" aria-labelledby="fc-login-title">
          <div className="fc-form-wrap w-100">
            <p className="fc-eyebrow">WELCOME BACK</p>
            <h2 id="fc-login-title" className="fc-form-title">Feel right at home.</h2>
            <p className="fc-intro">Sign in to your FreshCart account.</p>

            <form onSubmit={handleSubmit} aria-busy={pending !== null}>
              <div className="fc-field mb-4">
                <label className="form-label" htmlFor="fc-email">Email address</label>
                <input id="fc-email" name="email" type="email" className="form-control form-control-lg" placeholder="you@example.com" autoComplete="username" autoCapitalize="none" spellCheck={false} disabled={pending !== null} required/>
              </div>
              <div className="fc-field mb-3">
                <label className="form-label" htmlFor="fc-password">Password</label>
                <div className="fc-password position-relative">
                  <input id="fc-password" name="password" type={showPassword ? "text" : "password"} className="form-control form-control-lg" placeholder="Enter your password" autoComplete="current-password" disabled={pending !== null} required/>
                  <button type="button" className="fc-eye btn" aria-label={showPassword ? "Hide password" : "Show password"} aria-controls="fc-password" aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>
                    <Icon name={showPassword ? "eyeOff" : "eye"}/>
                  </button>
                </div>
              </div>
              <div className="fc-options d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div className="form-check mb-0">
                  <input id="fc-remember" name="rememberMe" className="form-check-input" type="checkbox" disabled={pending !== null}/>
                  <label className="form-check-label" htmlFor="fc-remember">Remember me</label>
                </div>
                <a className="fc-link" href={forgotPasswordUrl}>Forgot password?</a>
              </div>

              {error && <div className="alert alert-danger small" role="alert">{error}</div>}

              <button className="fc-submit btn btn-lg w-100 d-flex justify-content-center align-items-center gap-2" type="submit" disabled={pending !== null}>
                {pending === "email" ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"/>Signing in…</> : <>Sign in<Icon name="arrow" size={19}/></>}
              </button>

              {typeof onSocialLogin === "function" && <>
                <div className="fc-divider d-flex align-items-center gap-3 my-4"><span/><small>or continue with</small><span/></div>
                <div className="fc-social row g-2">
                  {["Google", "Facebook", "Apple"].map(provider => <div className="col-sm-4" key={provider}>
                    <button className="btn w-100" type="button" disabled={pending !== null} onClick={() => runAction(provider, () => onSocialLogin(provider.toLowerCase()))}>
                      {pending === provider ? "Connecting…" : provider}
                    </button>
                  </div>)}
                </div>
              </>}
            </form>

            <p className="fc-signup text-center">New around here? <a className="fc-link" href={signupUrl}>Create an account</a></p>
            <p className="fc-form-foot text-center mb-0">Your next fresh start is just a sign-in away.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

