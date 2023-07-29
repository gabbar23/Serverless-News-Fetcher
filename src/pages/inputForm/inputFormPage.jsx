// App.js

import React from "react";
import InputForm from "../../Components/inputForm/inputFormComp";
import "./inputFormPage.css";
const inputFormPage = () => {
  return (
    <div className="container">
      <h1 style={{ textDecoration: "none" }}>
        <a
          href="/LandingPage"
          style={{ textDecoration: "none", color: "black" }}
        >
          News Page
        </a>
      </h1>

      <InputForm />
    </div>
  );
};

export default inputFormPage;
