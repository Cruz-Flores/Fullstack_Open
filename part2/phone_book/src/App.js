import React, { useState, useEffect } from 'react'
import axios from 'axios'
import bookService from './services/phonebook.js'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Book from './components/Book.js'
import {Notification} from './components/Notification.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({
    name: '',
    number: ''
  })
  const [ filter, setFilter ] = useState('')
  const [ match, setMatch ] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [classEvent, setClassEvent] = useState(true)

  const handleInputChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name] : event.target.value
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson.name,
      number: newPerson.number
    }
    if(persons.map(person => person.name.toLowerCase()).includes(personObject.name.toLowerCase())){
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        const personToReplace = persons.find(n => n.name.toLowerCase() === personObject.name.toLocaleLowerCase())
        const personReplaced = {...personToReplace, number: personObject.number}

        bookService
          .update(personReplaced.id, personReplaced)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewPerson({
              name: '',
              number: ''
            })
            setErrorMessage(`added ${returnedPerson.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000);
          })
          .catch(error => {
            setClassEvent(false)
            setErrorMessage(
              `Information of ${personReplaced.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
              setClassEvent(true)
            }, 2000);
            setPersons(persons.filter(n => n.id !== personReplaced.id ))
          })
      }
    }
    else{
      bookService
        .create(personObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewPerson({
            name: '',
            number: ''
          })
          setErrorMessage(`added ${personObject.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
    }
  }

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      bookService
        .deletePerson(person.id)
      setPersons(persons.filter(n => n.id !== person.id))
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if(!event.target.value.length>0) {
      setMatch([])
    }
    else{
      const coincidences = persons.filter(person => {
        const textToSearch = event.target.value.toLowerCase()
        const personToCompare = person.name.toLowerCase()
        return personToCompare.includes(textToSearch)
      })        
      setMatch([...coincidences])
    }
  }

  useEffect(() => {
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
  }, [])

  console.log('render', persons.length, 'notes')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} classEvent={classEvent} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} match={match} />
      <h2>Add a new</h2>
      <Form onSubmit={addPerson} handleInputChange={handleInputChange} newPerson={newPerson} />
      <h2>Numbers</h2>
      <Book persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App