function FilterBar({
  filters,
  setFilters,
  hostelOptions,
  blockOptions,
  floorOptions,
}) {
  const handleChange = (key, value) => {
    setFilters((prev) => {
      if (key === "hostel") {
        return { ...prev, hostel: value, block: "", floor: "" };
      }
      if (key === "block") {
        return { ...prev, block: value, floor: "" };
      }
      return { ...prev, [key]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      hostel: "",
      block: "",
      floor: "",
      sortBy: "newest",
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="filter-search-wrap">
          <input
            type="text"
            placeholder="Search by title, description, or student..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="filter-input"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Under Consideration">Under Consideration</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={filters.hostel}
          onChange={(e) => handleChange("hostel", e.target.value)}
          className="filter-select"
        >
          <option value="">All Hostels</option>
          {hostelOptions.map((hostel) => (
            <option key={hostel} value={hostel}>
              {hostel}
            </option>
          ))}
        </select>

        <select
          value={filters.block}
          onChange={(e) => handleChange("block", e.target.value)}
          className="filter-select"
          disabled={!filters.hostel}
        >
          <option value="">All Blocks</option>
          {blockOptions.map((block) => (
            <option key={block} value={block}>
              {block}
            </option>
          ))}
        </select>

        <select
          value={filters.floor}
          onChange={(e) => handleChange("floor", e.target.value)}
          className="filter-select"
          disabled={!filters.block}
        >
          <option value="">All Floors</option>
          {floorOptions.map((floor) => (
            <option key={floor} value={floor}>
              {floor}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => handleChange("sortBy", e.target.value)}
          className="filter-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button onClick={clearFilters} className="clear-btn">
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterBar;