import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Collapse, CircularProgress } from '@mui/material';
import { getComments, postComment } from '../api'; // Replace with your API functions
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentCard from './CommentCard';

function CommentsSection({ articleId }) {
  const [comments, setComments] = useState([]); // Store top-level comments
  const [loading, setLoading] = useState(false); // Indicates if comments are loading
  const [expanded, setExpanded] = useState(false); // Toggle section expansion
  const [newComment, setNewComment] = useState(''); // Holds new comment input
  // Fetch comments when the component mounts or expands
  useEffect(() => {
    if (expanded) {
      setLoading(true);
      getComments(articleId)
        .then((data) => {
          console.log(data)
          setComments(data); 
        })
        .catch((err) => {
          console.error('Error fetching comments:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [expanded, articleId]);

  const handlePostComment = () => {
    if (newComment.trim()) {
      setLoading(true);
      postComment(articleId, { 
        username: "grumpy19", // Replace with user context at some point
        body: newComment 
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

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        startIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded((prev) => !prev)}
        variant="contained"
        color="primary"
        sx={{ width: '100%', mb: 2 }}
      >
        {expanded ? 'Hide Comments' : 'Show Comments'}
      </Button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} articleId={articleId} />
            ))
          ) : (
            <Typography>No comments yet. Be the first to comment!</Typography>
          )}
        </Box>

        {/* Input Box for New Comments */}
        <Box sx={{ mt: 2 }}>
          <TextField
            multiline
            fullWidth
            label="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            rows={3}
          />
          <Button
            onClick={handlePostComment}
            variant="contained"
            color="secondary"
            sx={{ mt: 1 }}
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
