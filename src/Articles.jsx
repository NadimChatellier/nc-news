import { useState, useEffect } from 'react';
import { getArticles, getArticleData } from '../api';
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


// Modal style


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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: "40px" }}>
        {articles.length === 0 ? (
          <p>No articles available</p>
        ) : (
          articles.articles.map((article) => (
            <div className='article-container' style={{ flex: '0 1 calc(33.33% - 10px)' }} key={article.id}>
              <Card sx={{ maxWidth: 345, marginTop: "10px", display: 'inline-flex', flexDirection: 'column' }}>
                <CardActionArea onClick={() => handleOpenModal(article)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.article_img_url}
                    alt={`${article.title} by ${article.author}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Author: {article.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Like
                  </Button>
                  <Button size="small" color="primary">
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

