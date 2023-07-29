import React, { useEffect, useState } from "react";
import NewsBlocksComp from "../../Components/newsBlock/NewsBlocksComp";
import axios from "axios";
import { Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { FETCH_NEWS } from "../../utils/urls";
import Button from "@mui/material/Button";
const LandingPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await axios.get(FETCH_NEWS);
        const fetchedArticles = apiResponse.data.articles;
        setArticles(fetchedArticles);
        sessionStorage.setItem("articles", JSON.stringify(fetchedArticles)); // Save articles to session storage
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
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
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Button variant="contained" component={Link} to="/">
            Search new Keyword?
          </Button>
        </Grid>
      </Grid>

      <NewsBlocksComp newsData={articles} />
    </div>
  );
};

export default LandingPage;
