import React, { useState } from "react";
import blogService from "../services/blogs";
import propTypes from "prop-types";

const Blog = ({ blog, user, handleLike }) => {
  const [likes, setLikes] = useState(blog.likes);

  const [visible, setVisible] = useState(true);

  const removeBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) &&
      blogService.remove(blog.id).then(setVisible(false));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? "" : "none",
  };

  const [blogExpanded, setBlogExpanded] = useState(false);
  const hideWhenVisible = { display: blogExpanded ? "none" : "" };
  const showWhenVisible = { display: blogExpanded ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="minimizedContent">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setBlogExpanded(true)}>show</button>
      </div>
      <div style={showWhenVisible} className="expandedContent">
        {blog.title}{" "}
        <button onClick={() => setBlogExpanded(false)}>hide</button> <br />
        {blog.url} <br />
        likes {likes}{" "}
        <button onClick={() => handleLike(blog, likes, setLikes)}>like</button>{" "}
        <br />
        {blog.author}
        <br />
        {user && blog.user.username === user.username && (
          <button onClick={removeBlog}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
};

export default Blog;
