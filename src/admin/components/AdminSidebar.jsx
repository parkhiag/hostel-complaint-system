import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/latest", label: "Latest Complaints" },
    { to: "/admin/all", label: "All Complaints" },
    { to: "/admin/profile", label: "Profile" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-dot"></div>
        <span className="sidebar-brand-text">Admin Portal</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="logout-btn">Logout</button>
      </div>
    </aside>
  );
}

export default AdminSidebar;