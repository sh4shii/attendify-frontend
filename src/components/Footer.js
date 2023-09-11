import React from "react";
import "../index.css";

const Footer = () => {
  return (
    <div>
      <footer style={{ padding: "10px" }}>
        <div className="footer-items">
          <div className="f-items">
            <h1>&lt; AtCOM &gt;</h1>
            <p
              style={{ marginTop: "30px", fontSize: "1.2rem", opacity: "0.5" }}
            >
              © Copyright 2023. All Rights Reserved by AMT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
