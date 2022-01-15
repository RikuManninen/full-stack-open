import PropTypes from "prop-types"
import React, {useState} from "react"
const BlogForm = ({ blogService, blogs, setBlogs, msg }) => {
  
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          msg({
            type: 'success',
            content: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
          })
          setTitle('')
          setAuthor('')
          setUrl('')
          setBlogFormVisible(false)
        })
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  blogService: PropTypes.object.isRequired, 
  blogs: PropTypes.array.isRequired, 
  setBlogs: PropTypes.func.isRequired, 
  msg: PropTypes.func.isRequired
}

export default BlogForm