import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import LogFilter from "../components/LogFilter";
import { readLogs } from "../readLogs";
import Logo from "../images/logo.png"


const pageStyles = {
    padding: "20px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
    maxWidth: "800px",
    margin: "0 auto",
  };

const IndexPage = () => {
    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await readLogs();
            setLogsData(data);
        };

        fetchData();
    }, []);

    return (
        <>
            <TopBar />
            <main style={pageStyles}>
                <LogFilter data={logsData} />
            </main>
        </>
    );
};

export default IndexPage;

export const Head = () => (
    <>
      <title>Utec Logger UI</title>
      <link rel="icon" type="image/png" href={Logo} />
    </>
);