import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./services/supabaseClient";

import StudentLogin from "./pages/auth/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import Complaints from "./pages/student/complaints";
import CompleteProfile from "./pages/common/CompleteProfile";

// Admin imports
import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import LatestComplaints from "./admin/pages/LatestComplaints";
import AllComplaints from "./admin/pages/AllComplaints";
import Profile from "./admin/pages/Profile";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      // Only redirect if user is on root
      if (data.session && window.location.pathname === "/") {
        navigate("/dashboard");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<StudentLogin />} />

      {/* Student Routes */}
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/complaints" element={<Complaints />} />

      {/* Common */}
      <Route path="/complete-profile" element={<CompleteProfile />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="latest" element={<LatestComplaints />} />
        <Route path="all" element={<AllComplaints />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;