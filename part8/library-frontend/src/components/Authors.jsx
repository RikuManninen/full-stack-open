import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = ({ show }) => {

  const authors = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <BirthYearForm authors={authors} />
    </div>
  )
}

const BirthYearForm = ({authors}) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('update author...')

    await updateAuthor({
      variables: {
        name,
        setBornTo: parseInt(born),
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author
          <SelectAuthor authors={authors.data.allAuthors} setName={setName} />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const SelectAuthor = ({ authors, setName }) => { 
  return (
    <select onChange={({ target }) => setName(target.value)}>
      {authors.map((a) => (
        <option key={a.name} value={a.name}>{a.name}</option>
      ))}
    </select>
  )
}

export default Authors
