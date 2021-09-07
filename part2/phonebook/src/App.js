import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')

  const personsToShow = searchWord
  ? persons.filter(p => p.name.toLowerCase().includes(searchWord.toLowerCase()))
  : persons

  const addName = (event) => {
    event.preventDefault()
    if(persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const obj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(obj))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input 
            value={searchWord}
            onChange={handleSearchChange} 
          />
        </div>
      <h2>add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange} 
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )

}

export default App