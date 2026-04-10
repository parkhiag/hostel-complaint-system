import { useMemo, useState } from "react";
import ComplaintCard from "../components/ComplaintCard";
import FilterBar from "../components/FilterBar";
import { dummyComplaints } from "../data/dummyComplaints";

function AllComplaints() {
  const complaints = dummyComplaints;

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    hostel: "",
    block: "",
    floor: "",
    sortBy: "newest",
  });

  const hostelOptions = useMemo(() => {
    return [...new Set(complaints.map((c) => c.hostel))].sort();
  }, [complaints]);

  const blockOptions = useMemo(() => {
    if (!filters.hostel) return [];
    return [
      ...new Set(
        complaints
          .filter((c) => c.hostel === filters.hostel)
          .map((c) => c.block)
      ),
    ].sort();
  }, [complaints, filters.hostel]);

  const floorOptions = useMemo(() => {
    if (!filters.hostel || !filters.block) return [];
    return [
      ...new Set(
        complaints
          .filter(
            (c) =>
              c.hostel === filters.hostel && c.block === filters.block
          )
          .map((c) => c.floor)
      ),
    ].sort();
  }, [complaints, filters.hostel, filters.block]);

  const filteredComplaints = useMemo(() => {
    let result = [...complaints];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.studentName.toLowerCase().includes(q)
      );
    }

    if (filters.status) {
      result = result.filter((c) => c.status === filters.status);
    }
    if (filters.hostel) {
      result = result.filter((c) => c.hostel === filters.hostel);
    }
    if (filters.block) {
      result = result.filter((c) => c.block === filters.block);
    }
    if (filters.floor) {
      result = result.filter((c) => c.floor === filters.floor);
    }

    result.sort((a, b) =>
      filters.sortBy === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return result;
  }, [complaints, filters]);

  return (
    <div className="page-shell">
      <div className="page-heading">
        <h2 className="page-title">All Complaints</h2>
        <p className="page-subtitle">
          Search, filter, sort, and update complaints quickly.
        </p>
      </div>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        hostelOptions={hostelOptions}
        blockOptions={blockOptions}
        floorOptions={floorOptions}
      />

      <p className="results-text">
        {filteredComplaints.length} complaint
        {filteredComplaints.length !== 1 ? "s" : ""} found
      </p>

      <div className="complaint-list">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))
        ) : (
          <div className="empty-state">
            No complaints match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default AllComplaints;