import React from "react";
import utecLogo from "../images/utec-logo.png";

const topBarStyles = {
  backgroundColor: "#212121",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  padding: "12px 80px",
};

const logoStyles = {
  height: "60px",
};

const TopBar = () => {
  return (
    <div style={topBarStyles}>
      <img src={utecLogo} alt="UTEC Logo" style={logoStyles} />
    </div>
  );
};

export default TopBar;
