import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Collapse, CircularProgress } from '@mui/material';
import { getComments, postComment } from '../api'; // Replace with your API functions
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentCard from './CommentCard';

function CommentsSection({ articleId }) {
  const [comments, setComments] = useState([]); // Store comments
  const [loading, setLoading] = useState(false); // Indicates if comments are loading
  const [expanded, setExpanded] = useState(false); // Toggle section expansion
  const [newComment, setNewComment] = useState(''); // Holds new comment input
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page
  const [hasMore, setHasMore] = useState(true); // Tracks if there are more comments to fetch
  const commentsPerPage = 10; // Number of comments per page

  useEffect(() => {
    if (expanded) {
      fetchComments(currentPage);
    }
  }, [expanded, currentPage]);

  const fetchComments = (page = currentPage) => {
    setLoading(true);
    const optionalQuery = { limit: commentsPerPage, p: page };
    getComments(articleId, optionalQuery)
      .then((data) => {
        console.log('Fetched comments:', data);
        if (data.length < commentsPerPage) {
          setHasMore(false); // Stop loading if fewer comments than expected
        }

        setComments((prevComments) => {
          const newComments = data.filter(
            (newComment) => !prevComments.some((existing) => existing.comment_id === newComment.comment_id)
          );
          return [...prevComments, ...newComments];
        });
      })
      .catch((err) => {
        console.error('Error fetching comments:', err);
      })
      .finally(() => setLoading(false));
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      setLoading(true);
      postComment(articleId, {
        username: "grumpy19", // Replace with user context at some point
        body: newComment,
      })
        .then((newCommentData) => {
          setComments((prevComments) => [newCommentData, ...prevComments]); // Add new comment
          setNewComment('');
        })
        .catch((err) => {
          console.error('Error posting comment:', err);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchComments(currentPage + 1);
    }
  };

  return (
    <Box sx={{ mt: 4, bgcolor: '#1E1E2F', p: 2, borderRadius: '8px' }}>
      <Button
        startIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded((prev) => !prev)}
        variant="contained"
        sx={{
          width: '100%',
          mb: 2,
          bgcolor: expanded ? '#4527A0' : '#5E35B1',
          '&:hover': {
            bgcolor: expanded ? '#311B92' : '#4527A0',
          },
          color: '#FFFFFF',
        }}
      >
        {expanded ? 'Hide Comments' : 'Show Comments'}
      </Button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', p: 2, bgcolor: '#2C2C3E', borderRadius: '8px' }}>
          {loading && currentPage === 1 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress sx={{ color: '#90CAF9' }} />
            </Box>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} articleId={articleId} />
            ))
          ) : (
            <Typography sx={{ color: '#EDEDED', textAlign: 'center' }}>
              No comments yet. Be the first to comment!
            </Typography>
          )}
          {hasMore && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                onClick={handleLoadMore}
                variant="text"
                sx={{
                  color: '#90CAF9',
                  '&:hover': {
                    color: '#CE93D8',
                  },
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            multiline
            fullWidth
            label="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            rows={3}
            sx={{
              bgcolor: '#1E1E2F',
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                color: '#EDEDED',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5E35B1',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#90CAF9',
              },
            }}
            InputLabelProps={{
              style: { color: '#90CAF9' },
            }}
          />
          <Button
            onClick={handlePostComment}
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: '#5E35B1',
              '&:hover': {
                bgcolor: '#4527A0',
              },
              color: '#FFFFFF',
            }}
            disabled={loading || newComment.trim() === ''}
          >
            Post Comment
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}

export default CommentsSection;

