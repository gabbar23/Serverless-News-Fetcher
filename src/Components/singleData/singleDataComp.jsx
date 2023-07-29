import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./singleData.css";

const SingleDataComp = () => {
  const location = useLocation();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Retrieve the articles from session storage
    const storedArticles = sessionStorage.getItem("articles");

    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      const foundArticle = parsedArticles.find(
        (article) => article.id === location.state.id
      );
      setArticle(foundArticle);
    }
  }, []);

  return (
    <div className="container">
      {article ? (
        <div className="card">
          <div className="image-container">
            <img src={article.urlToImage} alt="Article" />
          </div>
          <div className="card-content">
            <h1 className="card-title">{article.title}</h1>
            <p className="card-author">{article.author}</p>
            <a className="card-author" href={article.url} target="_blank">
              Link
            </a>
            <p className="card-author">{article.publishedAt}</p>
            <p className="card-content">{article.content}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleDataComp;
