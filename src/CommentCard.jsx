import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { postComment } from '../api'; // Ensure you have this function

function CommentCard({ comment, articleId }) {
  return (
    <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f7f7f7' }}>
      <Typography variant="body1">
        {comment.author}: {comment.body}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
        {new Date(comment.created_at).toLocaleString()}
      </Typography>
    </Box>
  );
}

export default CommentCard;

