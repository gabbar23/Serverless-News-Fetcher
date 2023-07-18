import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import "./newsBlock.css";

const NewsBlocksComp = ({ newsData }) => {
  const navigate = useNavigate();

  const handleBlockClick = (id) => {
    navigate(`/SinglePage/`, { state: { id: id } });
  };

  return (
    <div className="root">
      <Grid container spacing={2} className="news-container">
        {newsData.map((article, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={index}
            className="news-block"
            onClick={() => handleBlockClick(article.id)}
          >
            <img src={article.urlToImage} alt="News" className="news-image" />
            <div className="news-title">{article.title}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsBlocksComp;
