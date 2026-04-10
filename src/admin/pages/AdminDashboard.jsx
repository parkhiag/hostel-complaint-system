import ComplaintCard from "../components/ComplaintCard";
import { dummyComplaints } from "../data/dummyComplaints";

function AdminDashboard() {
  const complaints = dummyComplaints;

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    underConsideration: complaints.filter(
      (c) => c.status === "Under Consideration"
    ).length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const latestThree = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const statCards = [
    {
      label: "Total Complaints",
      value: stats.total,
      className: "stat-card stat-neutral",
    },
    {
      label: "Pending",
      value: stats.pending,
      className: "stat-card stat-pending",
    },
    {
      label: "Under Consideration",
      value: stats.underConsideration,
      className: "stat-card stat-under",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      className: "stat-card stat-resolved",
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-heading">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">
          Overview of all registered complaints.
        </p>
      </div>

      <div className="stats-grid">
        {statCards.map((item) => (
          <div key={item.label} className={item.className}>
            <p className="stat-card-label">{item.label}</p>
            <p className="stat-card-value">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="section-block">
        <div className="section-heading">
          <h3 className="section-title">Recent Complaints</h3>
          <p className="section-subtitle">
            Quick view of the latest registered complaints.
          </p>
        </div>

        <div className="complaint-list">
          {latestThree.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;