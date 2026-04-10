import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabaseClient"

function StudentDashboard() {
  const name = "Student"
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [complaints, setComplaints] = useState([])

  // 🔹 Get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [])

  // 🔹 Fetch complaints
  useEffect(() => {
    if (!user) return

    const fetchComplaints = async () => {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (!error) {
        setComplaints(data)
      }
    }

    fetchComplaints()
  }, [user])

  // 🔹 Stats
  const totalComplaints = complaints.length
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length

  return (
    <div className="dashboard-page">

      {/* 🔹 Top Bar */}
      <div className="dashboard-topbar">
        <div className="topbar-brand">
          <div className="topbar-brand-dot"></div>
          Hostel Portal
        </div>

        <button className="btn-primary">
          Sign Out
        </button>
      </div>

      {/* 🔹 Body */}
      <div className="dashboard-body">

        {/* Greeting */}
        <h1 className="dashboard-greeting">
          Welcome back, {name}
        </h1>

        <p className="dashboard-sub">
          Here’s a quick overview of your hostel activity
        </p>

        {/* 🔹 Stats Cards */}
        <div className="dashboard-grid">

          <div 
            className="dashboard-card"
            onClick={() => navigate("/complaints")}
          >
            <div className="dashboard-card-icon">📋</div>
            <div className="dashboard-card-title">Total Complaints</div>
            <div className="dashboard-card-desc">
              {totalComplaints} complaints • {pendingComplaints} pending
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">📅</div>
            <div className="dashboard-card-title">Leaves Taken</div>
            <div className="dashboard-card-desc">
              Coming soon
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">📊</div>
            <div className="dashboard-card-title">Attendance</div>
            <div className="dashboard-card-desc">
              Coming soon
            </div>
          </div>

        </div>

        {/* 🔹 Quick Actions */}
        <h2 style={{ marginBottom: "12px", fontSize: "1rem" }}>
          Quick Actions
        </h2>

        <div className="dashboard-grid">

          <div 
            className="dashboard-card"
            onClick={() => navigate("/leave")}
          >
            <div className="dashboard-card-icon">➕</div>
            <div className="dashboard-card-title">Apply Leave</div>
            <div className="dashboard-card-desc">
              Request leave with dates and reason
            </div>
          </div>

          <div 
            className="dashboard-card"
            onClick={() => navigate("/complaints")}
          >
            <div className="dashboard-card-icon">⚠️</div>
            <div className="dashboard-card-title">Report Issue</div>
            <div className="dashboard-card-desc">
              Raise a complaint about hostel facilities
            </div>
          </div>

        </div>

        {/* 🔹 Recent Activity */}
        <h2 style={{ margin: "24px 0 12px", fontSize: "1rem" }}>
          Recent Activity
        </h2>

        <div className="dashboard-card">

          {complaints.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>
              No activity yet
            </p>
          ) : (
            complaints.slice(0, 5).map((c) => (
              <div
                key={c.id}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)"
                }}
              >
                {c.title}

                <span
                  style={{
                    float: "right",
                    color:
                      c.status === "Pending"
                        ? "orange"
                        : "var(--accent)"
                  }}
                >
                  {c.status}
                </span>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  )
}

export default StudentDashboard