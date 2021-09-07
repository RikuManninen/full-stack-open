import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if(persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const obj = {
        name: newName
      }
      setPersons(persons.concat(obj))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <p key={p.name}>{p.name}</p>)}
    </div>
  )

}

export default App