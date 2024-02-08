import React, { useState } from "react";

const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState("");

  const submitComment = (event) => {
    event.preventDefault();
    createComment(comment);
    setComment("");
  };

  return (
    <>
      <form onSubmit={submitComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </>
  );
};

export default CommentForm;
