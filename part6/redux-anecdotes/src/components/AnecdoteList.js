import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    return state.filter === 'ALL' 
    ? state.anecdotes 
    : state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = a => {
    console.log('vote', a.id)
    dispatch(voteAnecdote(a))
    dispatch(setNotification(`you voted '${a.content}'`, 5000))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList