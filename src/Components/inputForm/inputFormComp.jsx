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
        accessKeyId: "ASIAT33KAUVHZQYW4MAE",
        secretAccessKey: "Ad6L7/O4p8XldD/RFisjzLMZjjtWOBHQ/n9QZTDC",
        sessionToken:
          "FwoGZXIvYXdzEAgaDP/xDa2hsRitK3HPASLAASQ+t+KQb4kaO//gZBLabBiXvaSC8sA9mCbUqmflpJbEyCWurSP0BOfjzwXMz9nd18coO1WLGoWoYAYk2o2/nG5jsP35ROiVYeZTRYxMt9WRqhNMQnQJn5qVTdoaGV/nDRjnMNCOUPemSZjCeUyo/1I8UEw1sbBlhJ5m7BsmGpjRHKev6z/jFuEmM31x+cXj76rFe3gzvFgmwXI2X3ahnPNTEtDUYMDx9iMzj+RVOHVaG1byABo7VGV5jJOREBXw/CjMmdylBjItWgZd0Wyw4XZkCHHrnRbBYk91O9mJixH9d3FQOSIv4S1Gm7BDkmf5lDdcJAlL",
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
    let newsData;
    try {
      var options = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search",
        params: {
          q: "Bitcoin",
          lang: "en",
          sort_by: "relevancy",
          page: "1",
          page_size: "10",
        },
        headers: {
          "x-api-key": "MckROtMrmK9Ax97WSQdJyw3mBYeDzQvdI6O9FKgxNAY",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          newsData = response.data;
          console.log(newsData);
        })
        .catch(function (error) {
          console.error(error);
        });

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
