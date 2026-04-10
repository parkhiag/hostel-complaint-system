import ComplaintCard from "../components/ComplaintCard";
import { dummyComplaints } from "../data/dummyComplaints";

function LatestComplaints() {
  const complaints = dummyComplaints;

  const latestComplaints = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="page-shell">
      <div className="page-heading">
        <h2 className="page-title">Latest Complaints</h2>
        <p className="page-subtitle">
          The most recent complaints filed by students.
        </p>
      </div>

      <div className="complaint-list">
        {latestComplaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
}

export default LatestComplaints;