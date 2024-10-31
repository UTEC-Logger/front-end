import React from 'react';
import Logo from "../images/logo.png";
import TopBar from "../components/TopBar";
import LogFilter from "../components/LogFilter";

const pageStyles = {
  padding: "20px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  maxWidth: "800px",
  margin: "0 auto",
};

const SqliteDataPage = ({ pageContext }) => {
    const { logsData } = pageContext; // Cambiado para usar logsData en lugar de sqliteData

    console.log(logsData); // Verifica que los datos estén disponibles

    return (
        <>
          <TopBar />
          <main style={pageStyles}>
            <LogFilter data={logsData} /> {/* Pasa logsData a LogFilter */}
          </main>
        </>
    );
};

export default SqliteDataPage;

export const Head = () => (
    <>
      <title>Utec Logger UI</title>
      <link rel="icon" type="image/png" href={Logo} />
    </>
);
