import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Book from './components/Book.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({
    name: "",
    number: ""
  })
  const [ filter, setFilter ] = useState('')
  const [match, setMatch] = useState([])


  const onSubmit = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newPerson.name,
      number: newPerson.number
    }
    
    const names = persons.map(person => person.name)

    if(names.includes(nameObject.name)){
      alert(`${nameObject.name} already exists in the book`)
    }
    else{
      setPersons(persons.concat(nameObject))
      setNewPerson({
        ...newPerson,
        name: "",
        number: ""
      })
    }  
  }
  
  const handleInputChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name] : event.target.value
    })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    
    if(!event.target.value.length>0) {
      const search = []
      setMatch([...search])
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
            setGlobalData(response.data)
            console.log(response)
        })
  }, [])

  console.log('render', persons.length, 'notes')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter match={match} filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2> 
      <Form onSubmit={onSubmit} newName={newPerson.name} newNumber={newPerson.number} handleInputChange={handleInputChange}  />     
      <h2>Numbers</h2>
      <Book persons={persons} />      
    </div>
  )
}

export default App