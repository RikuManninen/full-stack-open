import React, { useState } from "react";
import propTypes from "prop-types";
import useHandleLike from "../hooks/useHandleLike";
import useRemoveBlog from "../hooks/useRemoveBlog";

const Blog = ({ blog, user }) => {
  const handleLike = useHandleLike(blog);
  const removeBlog = useRemoveBlog(blog);

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) &&
      removeBlog();
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [blogExpanded, setBlogExpanded] = useState(false);
  const hideWhenVisible = { display: blogExpanded ? "none" : "" };
  const showWhenVisible = { display: blogExpanded ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="minimizedContent">
        {`${blog.title} ${blog.author} `}
        <button onClick={() => setBlogExpanded(true)}>show</button>
      </div>
      <div style={showWhenVisible} className="expandedContent">
        {`${blog.title} `}
        <button onClick={() => setBlogExpanded(false)}>hide</button> <br />
        {`${blog.url}`} <br />
        {`likes ${blog.likes} `}
        <button onClick={handleLike}>like</button> <br />
        {`${blog.author}`}
        <br />
        {user && blog.user.username === user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
};

export default Blog;
