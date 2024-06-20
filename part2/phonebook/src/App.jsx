import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/Persons'
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const personExist = persons.find(person => person.name === newName)
    personExist ? updatePerson(personExist, newPerson) : createPerson(newPerson)
  }

  const createPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePerson = (personExist, newPerson) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(personExist.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
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

  const handlePersonDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          alert(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsFiltered = nameFiltered ? persons.filter(person => person.name.toLowerCase().includes(nameFiltered.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={nameFiltered} handleNameFiltered={handleNameFiltered} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App
