function ComplaintCard({ complaint }) {
  const {
    studentName,
    hostel,
    block,
    floor,
    room,
    title,
    description,
    status,
    createdAt,
  } = complaint;

  const formattedDate = new Date(createdAt).toLocaleString();

  const getStatusClass = () => {
    if (status === "Pending") return "status-badge status-pending";
    if (status === "Under Consideration") return "status-badge status-under";
    if (status === "Resolved") return "status-badge status-resolved";
    return "status-badge status-default";
  };

  return (
    <div className="complaint-card">
      <div className="complaint-card-top">
        <h3 className="complaint-title">{title}</h3>
        <span className={getStatusClass()}>{status}</span>
      </div>

      <p className="complaint-description">{description}</p>

      <div className="complaint-meta-row">
        <span className="complaint-meta">
          {studentName} • {hostel}-{block} • Floor {floor} • Room {room}
        </span>
        <span className="complaint-date">{formattedDate}</span>
      </div>
    </div>
  );
}

export default ComplaintCard;