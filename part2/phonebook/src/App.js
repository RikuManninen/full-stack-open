import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const personsToShow = searchWord
  ? persons.filter(p => p.name.toLowerCase().includes(searchWord.toLowerCase()))
  : persons

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(p => p.name === newName)) {
      const person = persons.filter(p => p.name === newName)[0]
      window.confirm(`${person.name} is already added to phonebook, replase the old number with new one?`) &&
      updatePerson(person)
    }
    else {
      const obj = {
        name: newName,
        number: newNumber
      }
      personService
        .create(obj)
        .then(response => {
          setPersons(persons.concat(response.data))
          clearFields()
        })
    }
  }

  const updatePerson = (person) => {
    personService
      .update(person.id, { ...person, number: newNumber })
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        clearFields()
      })
  }
  
  const removePerson = (person) => {
    const newArray = persons.filter(p => p.id !== person.id)
    window.confirm(`Delete ${person.name} ?`) && 
    personService
      .remove(person.id)
      .then(setPersons(newArray))
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
        <PersonForm action={addPerson} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} remove={removePerson} />
    </div>
  )

}

export default App