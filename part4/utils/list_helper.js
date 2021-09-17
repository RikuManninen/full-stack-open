// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return !blogs
    ? 0
    : blogs.reduce((accum, item) => accum + item.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}