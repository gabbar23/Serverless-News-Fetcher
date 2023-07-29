import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import "./inputForm.css";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [keyword, setKeyword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };
  const handleSubmit = async () => {
    const client = new SecretsManagerClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: "ASIAT33KAUVH7HZYVNZH",
        secretAccessKey: "txd8NlUSPgsTuajxPWaiu0emhlX82Vn7guJVbVEM",
        sessionToken:
          "FwoGZXIvYXdzEP3//////////wEaDN++mA4JBdHYPBDCJiLAAeCF+gUIUbmXJV7sVjxOpGhkmoYwgbzIZNRMIdgANmxyiaAHghyRGmEzP+DQWjlsewibPf4lqgRCecEj8U6s3+S+dxisBZo4reABxUZf83//KgluICVLUjV50IfAsjUGiwT4bm4/oc7D3B65+I8cx744I+sE7gEMgyqvGd69XQjVq0/S6ti/+yCCQ3BLwnGXWU9qPGu2EtoDKX7neOrIWyDbTZSyK+CSm8ch6CZ2BJIuNFJAmHiKXuY1ELUS8rMYyyiZkZKmBjItbMx6uyWfAGudtDrJO+P/vzoar/7jg1vJ0Crf/d6j5eHXEtErrQXZZZv1CIGW",
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
    console.log("hi");
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            fontWeight={"bold"}
            component="h2"
          >
            Enter a Keyword
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <TextField
            fullWidth // This makes the text field take 100% width
            label="Keyword"
            variant="outlined"
            value={keyword}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <Button
            fullWidth // This makes the button take 100% width
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <br />
      {/* <h1>Subscribe to My Page</h1>
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
      </Button> */}
      <Button variant="contained" endIcon={<EmailIcon />} onClick={handleOpen}>
        Subscribe?
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Email
          </Typography>
          <TextField
            className="input"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="subscribe"
                  color="primary"
                  onClick={handleSubscribe}
                >
                  <ArrowForwardIcon />
                </IconButton>
              ),
            }}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You will only recieve email about new Data being added on the
            website only after you confirm you email address!
          </Typography>
        </Box>
      </Modal>

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
    </div>
  );
};

export default InputForm;
