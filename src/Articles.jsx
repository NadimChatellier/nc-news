import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for routing
import { getArticles } from "../api"; // Assume this API supports topic filtering
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Article from "./Article";
import SortDropdown from "./SortDropDown";
import CreateArticleButton from "./CreateArticle";
import CreateArticleModal from "./CreateArticleModal";

function Articles() {
  const [articles, setArticles] = useState([]); // Articles state
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [selectedArticle, setSelectedArticle] = useState(null); // Currently selected article
  const { slug } = useParams(); // Get the topic slug from the URL
  console.log(slug + " <<<<< topic slug");

  const [sortBy, setSortBy] = useState('created_at'); // Default sort by Date
  const [order, setOrder] = useState('asc'); // Default order ascending

  const [isCreateArticleModalOpen, setIsCreateArticleModalOpen] = useState(false);

  const handleOpenCreateArticleModal = () => setIsCreateArticleModalOpen(true);
  const handleCloseCreateArticleModal = () => setIsCreateArticleModalOpen(false);

  const handleCreateArticle = (articleData) => {
    console.log('New Article Data:', articleData);
    // Here you can add your API call or state update logic
    // For example, to save the article data
    setIsCreateArticleModalOpen(false);
  };

  useEffect(() => {
    const isHomepage = !slug;
    
    // Fetch articles from the API based on the topic slug and sort options
    getArticles(slug, slug ? '' : sortBy, slug ? '' : order)
      .then((response) => {
        if (response && response.articles) {
          setArticles(response.articles); // Set articles directly (filtered or unfiltered)
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [slug, sortBy, order]); // Refetch articles when the topic slug or sorting changes

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const handleSortChange = ({ sortBy, order }) => {
    console.log(`Sort by: ${sortBy}, Order: ${order}`);
    // Make an API request with the new sort parameters
    getArticles(slug, sortBy, order)
      .then((response) => {
        if (response && response.articles) {
          setArticles(response.articles); // Set articles directly (filtered or unfiltered)
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  };

  return (
    <>
      <SortDropdown onSortChange={handleSortChange}></SortDropdown>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginLeft: "40px",
        }}
      >
        {articles.length === 0 ? (
          <Typography
            sx={{ color: "#90CAF9", textAlign: "center", marginTop: "20px" }}
          >
            No articles available
          </Typography>
        ) : (
          articles.map((article) => (
            <div
              className="article-container"
              style={{ flex: "0 1 calc(33.33% - 20px)", height: "345px"}}
              key={article.id}
            >
              <Card
                sx={{
                  width: 345,
                  marginTop: "10px",
                  backgroundColor: "#2C2C3E",
                  color: "#EDEDED",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                  display: "inline-flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  height: "345px"
                }}
              >
                <CardActionArea onClick={() => handleOpenModal(article)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.article_img_url}
                    alt={`${article.title} by ${article.author}`}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#90CAF9" }}
                    >
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#CE93D8" }}>
                      Author: {article.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))
        )}
      </div>
      <Article
        selectedArticle={selectedArticle}
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
      />
      <CreateArticleButton onClick={handleOpenCreateArticleModal} />
      <CreateArticleModal
        open={isCreateArticleModalOpen}
        onClose={handleCloseCreateArticleModal}
        onSubmit={handleCreateArticle}
      />
      {/* Other components like SortDropdown, Article components can go here */}
    </>
  );
}

export default Articles;
