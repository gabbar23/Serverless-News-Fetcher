import React, { useEffect, useState } from "react";
import NewsBlocksComp from "../../Components/newsBlock/NewsBlocksComp";
import axios from "axios";
import { FETCH_NEWS } from "../../utils/urls";
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
      <h1>News Page</h1>
      <NewsBlocksComp newsData={articles} />
    </div>
  );
};

export default LandingPage;
