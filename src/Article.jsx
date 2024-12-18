import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {getArticleData} from '../api.js'; // Import your API function
import Lottie from 'lottie-react'; // Import Lottie component
import loadingAnimation from './lottieAnimations/LoadingSmiley.json'; // Path to your Lottie animation JSON file
import CommentsSection from './CommentSection';

function Article({ selectedArticle, openModal, handleCloseModal }) {
  const [articleBody, setArticleBody] = useState(''); // Holds the fetched article body
  const [loading, setLoading] = useState(false); // Tracks the loading state

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: '#FEFBEA',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  };

  // Fetch the article body when the modal is opened
  useEffect(() => {
    if (openModal && selectedArticle) {
      setLoading(true); // Start loading
      setArticleBody(''); // Clear previous body

      // API call to fetch article data
      getArticleData(selectedArticle.article_id)
        .then((response) => {
          setArticleBody(response.body || 'No content available.'); // Set the body text
        })
        .catch((error) => {
          console.error('Error fetching article body:', error);
          setArticleBody('Failed to load article content.');
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    }
  }, [openModal, selectedArticle]);

  return (
<Modal open={openModal} onClose={handleCloseModal}>
  <Box sx={modalStyle}>
    {selectedArticle && (
      <>
        {/* Scrollable Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh', // Restrict modal height
            overflowY: 'auto', // Make content scrollable
          }}
        >
          {/* Modal Content */}
          <Box sx={{ display: 'flex', maxWidth: '100%' }}>
            {/* Left Section: Image and Basic Info */}
            <Box sx={{ flex: '1', maxWidth: '50%', paddingRight: 2 }}>
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
                image={selectedArticle.article_img_url}
                alt={`${selectedArticle.title} by ${selectedArticle.author}`}
              />
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                {selectedArticle.title}
              </Typography>
              <Typography variant="subtitle1">
                Author: {selectedArticle.author}
              </Typography>
            </Box>

            {/* Right Section: Article Body */}
            <Box sx={{ flex: '1', paddingLeft: 2 }}>
              {loading ? (
                <>
                  <Lottie
                    animationData={loadingAnimation}
                    style={{ height: 200, width: 200, margin: 'auto' }}
                  />
                  <Typography>Loading article contents...</Typography>
                </>
              ) : (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {articleBody}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Comments Section */}
          <CommentsSection articleId={selectedArticle.article_id} />

          {/* Close Button */}
          <Button
            onClick={handleCloseModal}
            sx={{ marginTop: 2, alignSelf: 'center' }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </>
    )}
  </Box>
</Modal>
  );
}

export default Article;


