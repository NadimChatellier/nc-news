import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Badge } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { getArticleData, handleArticleVotes } from '../api.js'; // Import your API functions
import Lottie from 'lottie-react'; // Import Lottie component
import loadingAnimation from './lottieAnimations/LoadingSmiley.json'; // Path to your Lottie animation JSON file
import CommentsSection from './CommentSection';

function Article({ selectedArticle, openModal, handleCloseModal }) {
  const [articleBody, setArticleBody] = useState(''); // Holds the fetched article body
  const [loading, setLoading] = useState(false); // Tracks the loading state
  const [votes, setVotes] = useState(selectedArticle ? selectedArticle.votes : 0);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: '#1E1E2F', // Dark background color
    color: '#EDEDED', // Light text color
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  };

  const handleUpvote = () => {
    setVotes((prevVotes) => prevVotes + 1);
    handleArticleVotes(selectedArticle.article_id, 1);
  };

  const handleDownvote = () => {
    setVotes((prevVotes) => prevVotes - 1);
    handleArticleVotes(selectedArticle.article_id, -1);
  };

  // Fetch the article body when the modal is opened
  useEffect(() => {
    if (openModal && selectedArticle) {
      setLoading(true); // Start loading
      setArticleBody(''); // Clear previous body
      // API call to fetch article data
      getArticleData(selectedArticle.article_id)
        .then((response) => {
          setVotes(response.votes);
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
                      border: '2px solid #5E35B1', // Purple accent border
                    }}
                    image={selectedArticle.article_img_url}
                    alt={`${selectedArticle.title} by ${selectedArticle.author}`}
                  />
                  <Typography variant="h5" sx={{ marginTop: 2, color: '#90CAF9' }}>
                    {selectedArticle.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#CE93D8' }}>
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
                      <Typography sx={{ textAlign: 'center', color: '#CE93D8' }}>
                        Loading article contents...
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      {articleBody}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Vote Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  mt: 2,
                  color: '#90CAF9', // Blue accent for text
                }}
              >
                <IconButton onClick={handleUpvote} sx={{ color: '#90CAF9' }}>
                  <ThumbUp />
                </IconButton>
                <IconButton onClick={handleDownvote} sx={{ color: '#CE93D8' }}>
                  <ThumbDown />
                </IconButton>
                <Typography sx={{ ml: 2 }}>Votes: {votes}</Typography>
              </Box>

              {/* Comments Section */}
              <CommentsSection articleId={selectedArticle.article_id} />

              {/* Close Button */}
              <Button
                onClick={handleCloseModal}
                sx={{
                  marginTop: 2,
                  alignSelf: 'center',
                  bgcolor: '#5E35B1', // Purple background
                  color: '#FFFFFF', // White text
                  '&:hover': {
                    bgcolor: '#4527A0', // Darker purple on hover
                  },
                }}
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
