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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}