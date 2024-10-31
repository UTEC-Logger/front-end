import React, { useState } from "react";

const LogFilter = ({ data }) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [logType, setLogType] = useState("");
  const [date, setDate] = useState("");
  const [originFile, setOriginFile] = useState("");

  // Aplicar todos los filtros
  const filteredData = data ? data.filter(item => {
    return (
      (searchTerm === "" || item.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (logType === "" || item.log_type === logType) &&
      (date === "" || item.time.startsWith(date)) &&
      (originFile === "" || item.file_name.includes(originFile))
    );
  }) : [];

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Filtro de búsqueda general */}
      <input
        type="text"
        placeholder="Search by message..."
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
          filteredData.map((item, index) => (
            <li key={index}>
              <strong>Time:</strong> {item.time} | <strong>Type:</strong> {item.log_type} | <strong>File:</strong> {item.file_name}:{item.log_line} | <strong>Message:</strong> {item.message}
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
