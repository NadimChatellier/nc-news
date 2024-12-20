import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function CreateArticleButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={<AddIcon />}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        backgroundColor: '#5E35B1',
        color: 'white',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: '#4A278A', // Slightly darker purple for hover
        },
      }}
    >
      Create Article
    </Button>
  );
}

export default CreateArticleButton;

