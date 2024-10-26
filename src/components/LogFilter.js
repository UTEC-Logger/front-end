import React, { useState } from "react";

const LogFilter = ({ data }) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [logType, setLogType] = useState("");
  const [date, setDate] = useState("");
  const [originFile, setOriginFile] = useState("");

  // Aplicar todos los filtros
  const filteredData = data ? data.filter(item => {
    return (
      (searchTerm === "" || (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (logType === "" || item.type === logType) &&
      (date === "" || item.date === date) &&
      (originFile === "" || (item.file && item.file.includes(originFile)))
    );
}) : [];

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Filtro de búsqueda general */}
      <input
        type="text"
        placeholder="Search by content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      {/* Filtro de tipo de log */}
      <select
        value={logType}
        onChange={(e) => setLogType(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        <option value="">All Types</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>

      {/* Filtro de fecha */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      {/* Filtro de archivo de origen */}
      <input
        type="text"
        placeholder="Filter by origin file"
        value={originFile}
        onChange={(e) => setOriginFile(e.target.value)}
        style={{ padding: "10px" }}
      />

      {/* Resultados filtrados */}
      <ul style={{ marginTop: "20px" }}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li key={item.id}>
              <strong>Name:</strong> {item.name}, <strong>Age:</strong> {item.age}
            </li>
          ))
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
};

export default LogFilter;
