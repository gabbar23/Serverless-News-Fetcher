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
        accessKeyId: "ASIAT33KAUVHYFSSP6KH",
        secretAccessKey: "Sr+1biWfGcM3psJ3I0SShxOwxgPV+RnBzdN2RWXs",
        sessionToken:
          "FwoGZXIvYXdzEPj//////////wEaDNBHv0AlabEd+XfcHSLAAW85Ab9znzHf/6/0zVK8RFxONcgxdnvZFlMsiQb5AmAeFOfiiIWaM3qeUcAcs7B2Y9rA2kFpCLlfqhjjY5uF2mIdQSXpPpjzkvbPXEr8RXEc3jKciy+mh1idQ7ouFQ/FWFSI7YQ2RAf0TKcK7MCukHjwRqWjtDNSMj8y9ub787F56KI6EaPCwRyI1kG6TMiRe1/5hl57kQApn73M+J3WYX+XdwFdHlqUIBfPGHcRw0lQGKAfSTrZ/tHW5YSi7yHcdyj295CmBjIt2N3C4ZRWVrP3rd0eQEqsLQq0nbg7TWDYuDpNb/g1KiTGHhUzg4N6JslnlGaf",
      },
    });

    try {
      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT",
        })
      );

      const secret = response.SecretString;
      console.log(secret);

      const options = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search",
        params: {
          q: keyword,
          lang: "en",
          sort_by: "relevancy",
          page: "1",
          page_size: "10",
        },
        headers: {
          "x-api-key": secret,
        },
      };

      const newsApiResponse = await axios.request(options);
      const newsData = newsApiResponse.data;

      await axios.post(SAVE_NEWS, newsData);
      const message = `Hi there user!
      New News Data has been added to the Website 
      Topic : ${keyword}
      See you there!
      
      ~ News Data`;
      const subject = `New Data Added to Website`;
      const snsResponse = await axios.post(SUBSCRIBE_EMAIL, {
        message,
        email: "aman@gmail.com",
        subject,
      });
      console.log(snsResponse);
      navigate("/landingPage");

      if (snsResponse.status === 200) {
      } else {
        // Handle error scenario
        console.error("Failed to send email");
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
