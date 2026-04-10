import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../services/supabaseClient"

export function BrandPanel() {
  return (
    <div className="auth-brand-panel">
      <div className="brand-logo">
        <div className="brand-logo-icon"></div>
        <div className="brand-logo-text">Hostel Portal</div>
      </div>

      <div className="brand-content">
        <h1 className="brand-headline">
          A calmer way to manage <em>hostel life</em>
        </h1>
        <p className="brand-sub">
          Complaints, requests, updates - everything in one place.
        </p>
      </div>

      <div className="brand-pills">
        <span className="brand-pill">Fast</span>
        <span className="brand-pill">Organised</span>
        <span className="brand-pill">Transparent</span>
      </div>
    </div>
  )
}

function StudentLogin() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendLink = async () => {
    if (!email.endsWith("@dtu.ac.in")) {
      setToast({ type: "error", message: "Use college email only" })
      return
    }

    setLoading(true)
    setToast(null)

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    })

    setLoading(false)

    if (error) {
      console.log(error)
      setToast({ type: "error", message: error.message })
    } else {
      setOtpSent(true)
    }
  }

  if (otpSent) {
    return (
      <div className="auth-page">
        <BrandPanel />

        <div className="auth-form-panel">
          <div className="auth-card success-screen">
            <div className="success-icon">✓</div>

            <h2 className="auth-title">Check your email</h2>
            <p className="auth-subtitle">
              We’ve sent a login link to <strong>{email}</strong>
            </p>

            <button
              className="btn-primary"
              onClick={() => {
                setOtpSent(false)
                setEmail("")
              }}
            >
              Use different email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <BrandPanel />

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-eyebrow">Student Access</div>

          <h2 className="auth-title">Sign in to your account</h2>
          <p className="auth-subtitle">
            Use your DTU email to receive a login link
          </p>

          <div className="form-group">
            <label className="form-label">College Email</label>

            <div className="form-input-wrapper">
              <input
                type="email"
                className="form-input"
                placeholder="you@dtu.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendLink()
                }}
              />
            </div>

            <div className="form-hint">
              Only @dtu.ac.in emails are allowed
            </div>
          </div>

          <button
            className={`btn-primary ${loading ? "loading" : ""}`}
            onClick={handleSendLink}
            disabled={loading}
          >
            {loading && <span className="spinner"></span>}
            {loading ? "Sending..." : "Send Login Link"}
          </button>

          {toast && (
            <div className={`toast ${toast.type}`}>
              {toast.message}
            </div>
          )}

          <div className="auth-divider">or</div>

          <div className="auth-footer">
            <Link to="/admin-login" className="auth-link">
              Login as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin