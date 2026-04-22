import "./FilterBar.scss";

const FilterBar = ({ activeRegion, onFilterChange }) => {
  const regions = ["All", "Island", "Mainland"];

  return (
    <div className="filter-bar">
      {regions.map((region) => (
        <button
          key={region}
          className={`filter-btn ${activeRegion === region ? "active" : ""}`}
          onClick={() => onFilterChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
