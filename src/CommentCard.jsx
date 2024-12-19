import React, { useState } from 'react';
import { Box, Typography, IconButton, Badge, Button } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { handleCommentVotes, handleCommentDelete } from '../api'; // Ensure both functions are imported

function CommentCard({ comment }) {
  const [votes, setVotes] = useState(comment.votes || 0); // Initialize with existing votes count
  const [isDeleted, setIsDeleted] = useState(false); // Track if the comment is deleted

  const handleVote = (voteChange) => {
    const newVoteCount = votes + voteChange;
    setVotes(newVoteCount);
    handleCommentVotes(comment.comment_id, voteChange);
  };

  const handleDelete = () => {
    setIsDeleted(true); // Set the deleted flag
    handleCommentDelete(comment.comment_id);
  };

  // If the comment is deleted, render nothing
  if (isDeleted) {
    return null;
  }

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        border: '1px solid #4527A0', // Purple border for emphasis
        borderRadius: '8px',
        backgroundColor: '#2C2C3E', // Slightly lighter than main dark theme
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow for elevation
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Comment Body and Metadata */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ color: '#EDEDED' }}>
          {comment.body}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#90CAF9' }}>
          {new Date(comment.created_at).toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: '#CE93D8' }}>
          {comment.author}
        </Typography>
      </Box>

      {/* Voting Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => handleVote(1)} sx={{ color: '#90CAF9' }}>
          <Badge badgeContent={votes > 0 ? votes : 0} color="primary">
            <ThumbUp />
          </Badge>
        </IconButton>
        <IconButton onClick={() => handleVote(-1)} sx={{ color: '#CE93D8' }}>
          <Badge badgeContent={votes < 0 ? -votes : 0} color="secondary">
            <ThumbDown />
          </Badge>
        </IconButton>
      </Box>

      {/* Delete Button */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="outlined"
          sx={{
            color: '#E57373',
            borderColor: '#E57373',
            '&:hover': {
              backgroundColor: 'rgba(229, 115, 115, 0.1)',
              borderColor: '#FF1744',
            },
            ml: 2,
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>

      {/* Total Votes */}
      <Typography
        variant="caption"
        sx={{ mt: 1, ml: 2, color: '#EDEDED', fontWeight: 'bold', whiteSpace: 'nowrap' }}
      >
        Votes: {votes}
      </Typography>
    </Box>
  );
}

export default CommentCard;

