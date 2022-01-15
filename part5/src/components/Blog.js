import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, user}) => {

  const [likes, setLikes] = useState(blog.likes)

  const [visible, setVisible] = useState(true)

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

  const removeBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) && 
      blogService.remove(blog.id).then(setVisible(false))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const [blogExpanded, setBlogExpanded] = useState(false)
  const hideWhenVisible = { display: blogExpanded ? 'none' : '' }
  const showWhenVisible = { display: blogExpanded ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogExpanded(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={() => setBlogExpanded(false)}>hide</button><br/>
        {blog.url}<br/>
        likes {likes} <button onClick={addLike}>like</button><br/>
        {blog.author}<br/>
        {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
      </div>
    </div>  
  )
}

export default Blog