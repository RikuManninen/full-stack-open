import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const msg = (obj) => {
    setMessage(obj)
    setTimeout(() => setMessage(null), 5000)
  }

  blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      msg({
        type: 'error',
        content: 'wrong username or password'
      })
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('logged out')
  }

  const handleLike = (blog, likes, setLikes) => {

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

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogView = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <BlogForm blogService={blogService} blogs={blogs} setBlogs={setBlogs} msg={msg} />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={ message }/>
      {!user ? loginForm() : blogView()}
    </div>
  )

}

export default App