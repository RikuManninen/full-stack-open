import React from "react";
import propTypes from "prop-types";
import { Card, CardContent, Typography } from '@mui/material';

const Blog = ({ blog }) => {
  return (
    <Card sx={{ marginBottom: 2, '&:hover': { boxShadow: 6 } }} variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2">
            {blog.author}
          </Typography>
        </CardContent>
    </Card>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
};

export default Blog;
