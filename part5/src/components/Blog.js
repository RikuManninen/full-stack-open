import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {

  const [likes, setLikes] = useState(blog.likes)

  const addLike = () => {

    const blogObject = {
      id: blog.id,
      user: blog.user,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .put(blogObject)
        .then(returnedBlog => {
          setLikes(returnedBlog.likes)
        })
  }

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
        likes {likes} <button onClick={addLike}>like</button><br/>
        {blog.author}
      </div>
    </div>  
  )
  }

export default Blog