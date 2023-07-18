import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./inputForm.css";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import SAVE_NEWS from "../../utils/urls";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const secret_name = "newsAPI";

    const client = new SecretsManagerClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: "ASIAT33KAUVHWRHOOOV6",
        secretAccessKey: "4e47yXDM5bfJWALaAX4laYF3fGrYTIgLf4LhKRZz",
        sessionToken:
          "FwoGZXIvYXdzEOj//////////wEaDCCBkqO9EVEkw/g9AyLAAUJS75lJdjU/jFEmDqTZ6w7LBuclbxOp8Bygx1yunA1H5oM0QA3hg0tyl+iIwKNrch9rzyaRK+pCTuqiOSj7swFOrLsoMrZG5GBkxfC/NnwKK+Dic2KOzPBL/PkfZjuOffKiJQv9PbPV1oplL73CLeXycPTqp41LNVJnWiVzlc45ZjflXrk3+8C3Jg3/tLNXUkAyMzS8Ea9YXvbX6/fhJ2ZuwD0JGI1oDLeBuLt57ZX4PnpaCQuDk1q0Qie47AtqICi0rtWlBjIt93aBfvl0O5iVLMmOXr2f+ug/hjAfRr/2wabWKUvRXj06lY9Z78EOOHWfCZt1",
      },
    });

    let response;

    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT",
        })
      );
    } catch (error) {
      throw error;
    }

    const secret = response.SecretString;
    console.log(secret);

    try {
      const newsResponse = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=2cc5c60bfdf84d0984aa75e456d32d2a`
      );
      const newsData = newsResponse.data;
      console.log("API Response:", newsData);

      try {
        const apiResponse = await axios.post(SAVE_NEWS, newsData);

        console.log("API Result:", apiResponse.data);
        // Navigate to /landingPage with the received articles
        navigate("/landingPage");
      } catch (error) {
        console.error("API Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
