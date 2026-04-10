import { useState, useEffect } from "react"
import { supabase } from "../../services/supabaseClient"

function Complaints() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [complaints, setComplaints] = useState([])
  const [user, setUser] = useState(null)

  // 🔹 Get logged in user
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

  // 🔹 Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      alert("Fill all fields")
      return
    }

    const { error } = await supabase.from("complaints").insert([
      {
        user_id: user.id,
        title,
        description
      }
    ])

    if (error) {
      alert("Error submitting complaint")
    } else {
      setTitle("")
      setDescription("")

      // reload complaints
      const { data } = await supabase
        .from("complaints")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setComplaints(data)
    }
  }

  return (
    <div className="dashboard-page">

      {/* 🔹 Topbar */}
      <div className="dashboard-topbar">
        <div className="topbar-brand">
          <div className="topbar-brand-dot"></div>
          Complaints
        </div>
      </div>

      {/* 🔹 Body */}
      <div className="dashboard-body">

        <h1 className="dashboard-greeting">Report an Issue</h1>
        <p className="dashboard-sub">
          Facing a problem? Let us know and we’ll fix it.
        </p>

        {/* 🔹 Form */}
        <form onSubmit={handleSubmit} className="dashboard-card" style={{ marginBottom: "24px" }}>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. No water in washroom"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              style={{ paddingLeft: "14px" }}
            />
          </div>

          <button type="submit" className="btn-primary">
            Submit Complaint
          </button>

        </form>

        {/* 🔹 List */}
        <h2 style={{ marginBottom: "12px", fontSize: "1rem" }}>
          Your Complaints
        </h2>

        <div className="dashboard-card">

          {complaints.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>
              No complaints yet
            </p>
          ) : (
            complaints.map((c) => (
              <div
                key={c.id}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)"
                }}
              >
                <div style={{ fontWeight: "500" }}>
                  {c.title}
                </div>

                <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                  {new Date(c.created_at).toLocaleString()}
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
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  )
}

export default Complaints