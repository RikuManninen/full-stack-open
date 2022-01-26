import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  try {
    const response = await axios.post(baseUrl, object)
    return response.data
  } catch (error) {
    console.error(error.response.data)
  }
}

const services = { getAll, createNew }

export default services