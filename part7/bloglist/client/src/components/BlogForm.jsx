import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, Box, Typography } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url, comments: [] });
    setTitle("");
    setAuthor("");
    setUrl("");
    setBlogFormVisible(false);
  };

  return (
    <Box>
      {!blogFormVisible && (
        <Box marginBottom={2}>
        <Button variant="contained" onClick={() => setBlogFormVisible(true)}>
          Create new blog
        </Button>
        </Box>
      )}

      {blogFormVisible && (
        <Box sx={{ my: 2 }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Create new blog
          </Typography>
          <form onSubmit={addBlog} id="form">
            <TextField
              fullWidth
              id="title"
              label="Title"
              variant="outlined"
              sx={{ mb: 2 }}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <TextField
              fullWidth
              id="author"
              label="Author"
              variant="outlined"
              sx={{ mb: 2 }}
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
            <TextField
              fullWidth
              id="url"
              label="URL"
              variant="outlined"
              sx={{ mb: 2 }}
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
              <Button variant="outlined" onClick={() => setBlogFormVisible(false)}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
