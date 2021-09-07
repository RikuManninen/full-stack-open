import React, { useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      setNewNumber('')
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
        <Search value={searchWord} handler={handleSearchChange}/>
      <h2>add new</h2>
        <PersonForm action={addName} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} />
    </div>
  )

}

export default App