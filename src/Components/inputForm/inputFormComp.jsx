import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import "./inputForm.css";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { SAVE_NEWS } from "../../utils/urls";
import { SUBSCRIBE_EMAIL } from "../../utils/urls";
import { SNS_API } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
const secret_name = "MynewsAPI";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const InputForm = () => {
  console.log(SAVE_NEWS);
  const [keyword, setKeyword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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
          "x-api-key": secret,
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
        try {
          const response = await axios.post(SNS_API, email);

          console.log("API Result:", response.data);
          if (response.ok) {
          } else {
            // Handle error scenario
            console.error("Failed to send email");
          }
        } catch (error) {
          console.error(error);
        }
        // Navigate to /landingPage with the received articles
        navigate("/landingPage");
      } catch (error) {
        console.error("API Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const subscribeResponse = await axios.post(SUBSCRIBE_EMAIL, {
        email: email,
      });
      console.log("Subscribe API Result:", subscribeResponse.data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Subscribe API Error:", error);
    }
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      <br />
      <h1>Subscribe to My Page</h1>
      <TextField
        className="input"
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <br />

      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleSubscribe}
      >
        Subscribe
      </Button>

      {/* Snackbar to show success message */}
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Email subscribed successfully! Please Confirm Your Email
        </Alert>
      </Snackbar>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">
              You Will Recieve Email about new News Data added on the website
              after you confirm you Email!
            </Typography>
          </React.Fragment>
        }
      >
        <Button>Please Note</Button>
      </HtmlTooltip>
    </div>
  );
};

export default InputForm;
