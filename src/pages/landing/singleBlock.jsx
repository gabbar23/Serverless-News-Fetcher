// import React, { useEffect, useState } from "react";
import SingleDataComp from "../../Components/singleData/singleDataComp";
// import axios from "axios";

const SinglePage = () => {
  return (
    <div>
      <h1 style={{ textDecoration: "none" }}>
        <a
          href="/LandingPage"
          style={{ textDecoration: "none", color: "black" }}
        >
          News Page
        </a>
      </h1>
      <SingleDataComp />
    </div>
  );
};

export default SinglePage;
