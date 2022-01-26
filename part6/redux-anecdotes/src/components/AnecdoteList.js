import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from './Notification'

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
    notify(`you voted '${a.content}'`, dispatch)
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