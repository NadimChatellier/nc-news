import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';

import Article from './Article';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setArticles(response);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginLeft: '40px',
        }}
      >
        {articles.length === 0 ? (
          <Typography sx={{ color: '#90CAF9', textAlign: 'center', marginTop: '20px' }}>
            No articles available
          </Typography>
        ) : (
          articles.articles.map((article) => (
            <div
              className="article-container"
              style={{ flex: '0 1 calc(33.33% - 20px)' }}
              key={article.id}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  marginTop: '10px',
                  backgroundColor: '#2C2C3E', // Slightly lighter dark theme background
                  color: '#EDEDED', // Light text for contrast
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow
                  display: 'inline-flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
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
                      sx={{ color: '#90CAF9' }} // Blue accent for titles
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#CE93D8' }} // Purple accent for author name
                    >
                      Author: {article.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    sx={{
                      color: '#90CAF9', // Blue accent
                      '&:hover': { backgroundColor: 'rgba(144, 202, 249, 0.1)' },
                    }}
                  >
                    Like
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      color: '#CE93D8', // Purple accent
                      '&:hover': { backgroundColor: 'rgba(206, 147, 216, 0.1)' },
                    }}
                  >
                    Dislike
                  </Button>
                </CardActions>
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
    </>
  );
}

export default Articles;

