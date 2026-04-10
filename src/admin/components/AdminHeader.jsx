function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <h1 className="admin-header-title">Complaint Tracking Admin</h1>
        <p className="admin-header-subtitle">
          Manage student complaints quickly and clearly.
        </p>
      </div>

      <div>
        <button className="theme-btn">Light / Dark</button>
      </div>
    </header>
  );
}

export default AdminHeader;