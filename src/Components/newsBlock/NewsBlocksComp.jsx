import React from "react";
// import { makeStyles } from "@material-ui/core
import Grid from "@mui/material/Grid";

import "./newsBlock.css";

const NewsBlocksComp = ({ newsData }) => {
  return (
    <div className="root">
      <Grid container spacing={2} className="news-container">
        {newsData.map((news, index) => (
          <Grid item xs={6} sm={4} md={3} key={index} className="news-block">
            <img src={news.urlToImage} alt="News" className="news-image" />
            <div className="news-title">{news.title}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsBlocksComp;
