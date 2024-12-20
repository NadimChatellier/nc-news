import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, MenuItem, Select, CircularProgress } from '@mui/material';
import { getTopics, postArticle } from '../api';

function CreateArticleModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const [topics, setTopics] = useState([]);
  const [imgUrlError, setImgUrlError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateImageUrl = (url) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const isValid = imageExtensions.some((ext) => url.endsWith(`.${ext}`));
    return isValid;
  };

  const handleSubmit = () => {
    if (title && content && topic && imgUrl) {
      if (validateImageUrl(imgUrl)) {
        setLoading(true);
        postArticle({
          author: "grumpy19",
          title: title,
          body: content,
          topic: topic,
          article_img_url: imgUrl
        })
        .then(() => {
          setLoading(false);
          setTitle('');
          setContent('');
          setTopic('');
          setImgUrl('');
          setImgUrlError('');
          onClose();
        })
        .catch((error) => {
          console.error("Error posting article:", error);
          setLoading(false);
        });
      } else {
        setImgUrlError('Please enter a valid image URL.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: '#F3E5F5', // Light purple background
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    border: '2px solid #5E35B1', // Purple border
  };

  return (
    
    <Modal open={open} onClose={onClose}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <CircularProgress size={60} />
            <Typography variant="body1" sx={{ marginTop: 2, color: '#5E35B1' }}>
              Posting article...
            </Typography>
        </Box>
      ) : (
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ marginBottom: 2, color: '#5E35B1' }}>
            Create New Article
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{
              marginBottom: 2,
              bgcolor: 'white',
            }}
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            sx={{
              marginBottom: 2,
              bgcolor: 'white',
            }}
          />
          
          <Select
            label="Topic"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            sx={{
              marginBottom: 2,
              bgcolor: 'white',
            }}
          >
            {topics.map(({ slug }) => (
              <MenuItem key={slug} value={slug}>{slug}</MenuItem>
            ))}
          </Select>
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imgUrl}
            onChange={(e) => {
              setImgUrl(e.target.value);
              setImgUrlError(validateImageUrl(e.target.value) ? '' : 'Please enter a valid image URL.');
            }}
            required
            error={Boolean(imgUrlError)}
            helperText={imgUrlError}
            sx={{
              marginBottom: 2,
              bgcolor: 'white',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                bgcolor: '#4527A0',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#311B92',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                bgcolor: '#5E35B1',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#4527A0',
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Modal>
  );
}

export default CreateArticleModal;
