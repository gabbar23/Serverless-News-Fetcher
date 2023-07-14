import React from "react";
import NewsBlocksComp from "../../Components/newsBlock/NewsBlocksComp";

const newsData = [
  {
    title: "News Title 1",
    content: "News Content 1",
    urlToImage:
      "https://media.wired.com/photos/6487a9b70cbc15924e602c48/191:100/w_1280,c_limit/Fire-Weather-Review-Culture-1258525564.jpg",
    author: "Author 1",
  },
  {
    title: "News Title 2",
    content: "News Content 2",
    urlToImage:
      "https://media.wired.com/photos/6487a9b70cbc15924e602c48/191:100/w_1280,c_limit/Fire-Weather-Review-Culture-1258525564.jpg",
    author: "Author 2",
  },
  {
    title: "News Title 2",
    content: "News Content 2",
    urlToImage:
      "https://media.wired.com/photos/6487a9b70cbc15924e602c48/191:100/w_1280,c_limit/Fire-Weather-Review-Culture-1258525564.jpg",
    author: "Author 2",
  },
  {
    title: "News Title 2",
    content: "News Content 2",
    urlToImage:
      "https://media.wired.com/photos/6487a9b70cbc15924e602c48/191:100/w_1280,c_limit/Fire-Weather-Review-Culture-1258525564.jpg",
    author: "Author 2",
  },
  {
    title: "News Title 2",
    content: "News Content 2",
    urlToImage:
      "https://media.wired.com/photos/6487a9b70cbc15924e602c48/191:100/w_1280,c_limit/Fire-Weather-Review-Culture-1258525564.jpg",
    author: "Author 2",
  },
  // Add more news items as needed
];

const LandingPage = () => {
  return (
    <div>
      <h1>News Page</h1>
      <NewsBlocksComp newsData={newsData} />
    </div>
  );
};

export default LandingPage;
