import React, { useState } from "react";

const LogFilter = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logType, setLogType] = useState("");
  const [date, setDate] = useState("");
  const [originFile, setOriginFile] = useState("");

  // Aplicar todos los filtros
  const filteredData = data
    ? data.filter((item) => {
        return (
          (searchTerm === "" ||
            item.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (logType === "" || item.log_type === logType) &&
          (date === "" || item.time.startsWith(date)) &&
          (originFile === "" || item.file_name.includes(originFile))
        );
      })
    : [];

  // Colores para cada tipo de log
  const getLogColor = (type) => {
    switch (type) {
      case "INFO":
        return "#007BFF"; // Azul
      case "WARN":
        return "#FFC107"; // Amarillo
      case "ERROR":
        return "#DC3545"; // Rojo
      case "CRITICAL":
        return "#6F42C1"; // Púrpura
      default:
        return "#6C757D"; // Gris
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F8F9FA", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "20px", color: "#343A40" }}>Log Filter</h2>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {/* Filtro de búsqueda general */}
        <input
          type="text"
          placeholder="Search by message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #CED4DA",
            borderRadius: "4px",
            outline: "none",
          }}
        />

        {/* Filtro de tipo de log */}
        <select
          value={logType}
          onChange={(e) => setLogType(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #CED4DA",
            borderRadius: "4px",
            outline: "none",
            backgroundColor: "#FFF",
          }}
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
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #CED4DA",
            borderRadius: "4px",
            outline: "none",
          }}
        />

        {/* Filtro de archivo de origen */}
        <input
          type="text"
          placeholder="Filter by origin file"
          value={originFile}
          onChange={(e) => setOriginFile(e.target.value)}
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #CED4DA",
            borderRadius: "4px",
            outline: "none",
          }}
        />
      </div>

      {/* Resultados filtrados */}
      <ul style={{ listStyle: "none", paddingLeft: "0", marginTop: "20px" }}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#FFF",
                borderLeft: `5px solid ${getLogColor(item.log_type)}`,
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <strong style={{ color: getLogColor(item.log_type) }}>
                {item.log_type}:
              </strong>{" "}
              <strong>Time:</strong> {item.time} | <strong>File:</strong>{" "}
              {item.file_name}:{item.log_line} | <strong>Message:</strong>{" "}
              {item.message}
            </li>
          ))
        ) : (
          <li style={{ color: "#6C757D" }}>No results found.</li>
        )}
      </ul>
    </div>
  );
};

export default LogFilter;
