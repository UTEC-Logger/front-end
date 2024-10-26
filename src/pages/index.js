import * as React from "react";
import Logo from "../images/logo.png"
import TopBar from "../components/TopBar";
import LogFilter from "../components/LogFilter";

const pageStyles = {
  padding: "20px 200px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const IndexPage = () => {
  return (
    <>
      <TopBar />
      <main style={pageStyles}>
        <LogFilter />
        {/* Aquí puedes añadir más contenido o componentes en el futuro */}
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