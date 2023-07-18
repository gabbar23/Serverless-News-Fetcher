import ReactDOM from "react-dom/client";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import InputFormPage from "./pages/inputForm/inputFormPage";

import App from "./app";
import LandingPage from "./pages/landing/landingPage";
import SinglePage from "./pages/landing/singleBlock";
const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Register />);
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route exact path="/" element={<InputFormPage />} />
        <Route exact path="/LandingPage" element={<LandingPage />} />
        <Route exact path="/SinglePage" element={<SinglePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
