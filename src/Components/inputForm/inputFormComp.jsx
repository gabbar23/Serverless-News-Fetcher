import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./inputForm.css";

const InputForm = () => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = () => {
    fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=2cc5c60bfdf84d0984aa75e456d32d2a`
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        console.log("API Response:", data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="root">
      <h1>Enter Keyword</h1>
      <TextField
        className="input"
        label="Keyword"
        variant="outlined"
        value={keyword}
        onChange={handleChange}
      />
      <br />
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default InputForm;
