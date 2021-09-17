var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return !blogs
    ? 0
    : blogs.reduce((accum, item) => accum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((p, c) => (p.likes > c.likes) ? p : c)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const { flow, countBy, toPairs, maxBy, tail } = _

  const fn = flow(
    arr => countBy(arr, 'author'),
    toPairs,
    arr => maxBy(arr, tail),
    arr => { return { author: arr[0], blogs: arr[1] } }
  )

  return fn(blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}