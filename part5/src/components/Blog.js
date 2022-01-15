import React, { useState } from 'react'
const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={() => setBlogVisible(false)}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button>like</button><br/>
        {blog.author}
      </div>
    </div>  
  )
  }

export default Blog