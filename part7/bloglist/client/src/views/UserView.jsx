import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const UserView = () => {
  let { state: user } = useLocation();

  return (
    <Paper elevation={2} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        {user.name}
      </Typography>

      <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 2 }}>
        Added blogs
      </Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserView;
