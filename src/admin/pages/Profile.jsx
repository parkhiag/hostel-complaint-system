function Profile() {
  return (
    <div className="page-shell">
      <div className="page-heading">
        <h2 className="page-title">Profile</h2>
        <p className="page-subtitle">
          Your account details and preferences.
        </p>
      </div>

      <div className="profile-wrap">
        <div className="profile-card">
          <div className="profile-banner"></div>

          <div className="profile-body">
            <div className="profile-top">
              <div className="profile-avatar">A</div>

              <div>
                <p className="profile-name">Admin User</p>
                <span className="profile-role">Hostel Administrator</span>
              </div>
            </div>

            <p className="profile-note">
              This is a placeholder for now until you build admin auth.
            </p>

            <div className="profile-fields">
              <div>
                <span className="profile-field-label">Name</span>
                <div className="profile-field-value">Admin User</div>
              </div>

              <div>
                <span className="profile-field-label">Role</span>
                <div className="profile-field-value">Hostel Administrator</div>
              </div>

              <div>
                <span className="profile-field-label">Email</span>
                <div className="profile-field-value">admin@example.com</div>
              </div>

              <div>
                <span className="profile-field-label">Theme</span>
                <div className="profile-field-value">
                  Supports Light and Dark Mode
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;