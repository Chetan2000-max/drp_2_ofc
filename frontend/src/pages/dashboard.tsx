import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// REMOVED UNUSED INSTANCE: import API from "../api/axios";
import "./dashboard.css";

type User = {
  username: string;
  role: string;
  is_active: boolean;
};

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");
    const savedIsActive = localStorage.getItem("is_active");

    if (savedName && savedRole && savedIsActive != null) {
      setUser({
        username: savedName,
        role: savedRole,
        is_active: savedIsActive === "true",
      });
    } else {
      setError("Please login to view the dashboard.");
    }

    setLoading(false);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-subtitle">Project Management System</p>
            <h1>Dashboard</h1>
          </div>
          <div className={`status-badge ${user?.is_active ? "active" : "inactive"}`}>
            {user?.is_active ? "Active" : "Inactive"}
          </div>
        </div>

        {loading ? (
          <p className="dashboard-message">Loading user info...</p>
        ) : error ? (
          <p className="dashboard-message dashboard-error">{error}</p>
        ) : (
          <div className="dashboard-user-info">
            <p>
              <span>Logged in as:</span>
              <strong>{user?.username || "Unknown user"}</strong>
            </p>
            <p>
              <span>Role:</span>
              <strong>{user?.role || "User"}</strong>
            </p>
            <p>
              <span>Status:</span>
              <strong>{user?.is_active ? "Active" : "Inactive"}</strong>
            </p>
          </div>
        )}

        <div className="dashboard-links">
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
