const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

describe('when there is initially three blogs at db, added by testUser', () => {

  let token = null
  let userId = null

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'testUser', passwordHash })
    await user.save()
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)
    userId = user._id
  })

  beforeEach(async () => {

    await Blog.deleteMany({})

    const initBlogsWithUser = helper.initialBlogs.map(obj => ({ ...obj, user: userId }))

    let blogObject = new Blog(initBlogsWithUser[0])
    await blogObject.save()
    blogObject = new Blog(initBlogsWithUser[1])
    await blogObject.save()
    blogObject = new Blog(initBlogsWithUser[2])
    await blogObject.save()

  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtStart = await helper.blogsInDb()

    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const titles = blogsAtStart.map(blog => blog.title)

    expect(titles).toContain(
      'React patterns'
    )
  })

  test('blog\'s id field is named \'id\'', async () => {
    const blogsAtStart = await helper.blogsInDb()

    expect(blogsAtStart[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'My GitHub Page',
      author: 'Riku Manninen',
      url: 'github.com/RikuManninen',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('an invalid blog can not be added', async () => {

    const newBlog = {
      author: 'Riku Manninen'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('if blog doesn\'t have a \'likes\' field, it is added and set to 0', async () => {
    const newBlog = {
      title: 'My GitHub Page',
      author: 'Riku Manninen',
      url: 'github.com/RikuManninen'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    const updatedBlog = {
      title: 'Go To Statement Considered Harmful - Updated',
      url: 'https://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).toContain(updatedBlog.title)
  })

  test('a blog cannot be added if token is missing', async() => {
    const newBlog = {
      title: 'My GitHub Page',
      author: 'Riku Manninen',
      url: 'github.com/RikuManninen',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'riku',
      name: 'Riku Manninen',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('creation fails with proper statuscode and message', () => {
    test('if username is already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salasana',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('if username is not defined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Riku Manninen',
        password: 'salasana'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('if username is shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ri',
        name: 'Riku Manninen',
        password: 'salasana'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('is shorter than the minimum allowed length (3).')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('if password is not defined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'riku',
        name: 'Riku Manninen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('if password is shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'riku',
        name: 'Riku Manninen',
        password: 'sa'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password must be at least 3 characters')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})