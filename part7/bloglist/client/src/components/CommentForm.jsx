import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState("");

  const submitComment = (event) => {
    event.preventDefault();
    createComment(comment);
    setComment("");
  };

  return (
    <Box component="form" onSubmit={submitComment} noValidate sx={{ maxWidth: 600 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="comment"
        label="Comment"
        name="Comment"
        autoComplete="off"
        autoFocus
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        variant="outlined"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, maxWidth:150 }}
      >
        Add Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
