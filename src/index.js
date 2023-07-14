import ReactDOM from "react-dom/client";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import InputFormPage from "./pages/inputForm/inputFormPage";

import App from "./app";
import LandingPage from "./pages/landing/landingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Register />);
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route exact path="/input" element={<InputFormPage />} />
        <Route exact path="/LandingPage" element={<LandingPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
