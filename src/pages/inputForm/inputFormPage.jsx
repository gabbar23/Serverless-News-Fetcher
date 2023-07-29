// App.js

import React from "react";
import InputForm from "../../Components/inputForm/inputFormComp";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

import "./inputFormPage.css";
const inputFormPage = () => {
  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h4">
            <a
              href="/LandingPage"
              target="_blank"
              rel="noopener noreferrer"
              className="noUnderline" // Apply the CSS class
            >
              News Data
            </a>
          </Typography>
        </Grid>
      </Grid>

      <InputForm />
    </div>
  );
};

export default inputFormPage;
