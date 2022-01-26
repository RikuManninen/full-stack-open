const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return [...state].map(obj => (
        obj.id === action.id
        ? { ...obj, votes: obj.votes + 1 } 
        : obj
      ))
    case 'ADD_NEW': 
      return [...state, asObject(action.data)]
    case 'SORT_BY_VOTES':
      return [...state].sort((a, b) => {
        return b.votes - a.votes
      })
    case 'INIT':
      return action.data.map(asObject)
    default: return state
  }
}

export const createAnecdote = content => {
  return {
    type: 'ADD_NEW',
    data: content
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE', 
    id: id
  }
}

export const sortAnecdotes = () => {
  return {
    type: 'SORT_BY_VOTES'
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}

export default anecdoteReducer