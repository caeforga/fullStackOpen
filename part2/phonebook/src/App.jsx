import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFiltered, setNameFiltered] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFiltered = (event) => {
    setNameFiltered(event.target.value)
  }

  const personsFiltered = nameFiltered ? persons.filter(person => person.name.toLowerCase().includes(nameFiltered.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={nameFiltered} handleNameFiltered={handleNameFiltered} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} />
    </div>
  )
}

export default App
