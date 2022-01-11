const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if(req.token) {
    const decoded = jwt.verify(
      req.token,
      process.env.SECRET
    )
    const user = await User.findById(decoded.id)
    req.user = user
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}