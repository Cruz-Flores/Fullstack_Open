import React, { useState } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Book from './components/Book.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('new name')
  const [ newNumber, setNewNumber ] = useState('new number')
  const [ filter, setFilter ] = useState('')
  const [match, setMatch] = useState([])


  const onSubmit = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const names = persons.map(person => person.name)

    if(names.includes(nameObject.name)){
      alert(`${nameObject.name} already exists in the book`)
    }
    else{
      setPersons(persons.concat(nameObject))
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    let re = new RegExp([event.target.value],'i', 'S')
    let x = []
    for(let record in persons){
      if(re.test(persons[record].name)){
        x.push(persons[record])
        setMatch([...x])
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter match={match} filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2> 
      <Form onSubmit={onSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />     
      <h2>Numbers</h2>
      <Book persons={persons} />      
    </div>
  )
}

export default App