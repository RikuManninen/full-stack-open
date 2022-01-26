import anecdoteService from '../services/anecdotes'

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
      return [...state, action.data]
    case 'SORT_BY_VOTES':
      return [...state].sort((a, b) => {
        return b.votes - a.votes
      })
    case 'INIT':
      return action.data
    default: return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: anecdote
    })
  }
}

export const voteAnecdote = a => {
  return async dispatch => {
    const anecdote = await anecdoteService.addVote(a)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
    dispatch(sortAnecdotes())
  }
}

export const sortAnecdotes = () => {
  return {
    type: 'SORT_BY_VOTES'
  }
}

export const initializeAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
    dispatch(sortAnecdotes())
  }
}

export default anecdoteReducer