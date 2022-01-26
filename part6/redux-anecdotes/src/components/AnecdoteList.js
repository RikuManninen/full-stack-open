import { useSelector, useDispatch } from 'react-redux'
import { sortAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from './Notification'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = a => {
    console.log('vote', a.id)
    dispatch(voteAnecdote(a.id))
    dispatch(sortAnecdotes())
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