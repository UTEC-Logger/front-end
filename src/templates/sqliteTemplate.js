import React from 'react';
import Logo from "../images/logo.png"
import TopBar from "../components/TopBar";
import LogFilter from "../components/LogFilter";

const pageStyles = {
  padding: "20px 200px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const SqliteDataPage = ({ pageContext }) => {
    const { sqliteData } = pageContext;

    console.log(sqliteData);

    return (
        <>
          <TopBar/>
          <main style={pageStyles}>
            <LogFilter data={sqliteData}/>
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
