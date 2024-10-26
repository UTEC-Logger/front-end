import React from "react";

const filterContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
  marginTop: "20px",
};

const searchInputStyles = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  flex: 1,
  marginRight: "20px",
};

const selectStyles = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

const LogFilter = () => {
  return (
    <div style={filterContainerStyles}>
        
      {/* Buscador */}
      <input
        type="text"
        placeholder="Search logs..."
        style={searchInputStyles}
      />
      
      {/* Filtro de tipo de log */}
      <select style={selectStyles}>
        <option value="">All Types</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>
    </div>
  );
};

export default LogFilter;
