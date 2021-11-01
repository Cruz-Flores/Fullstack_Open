import React, { useState } from 'react'
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

    console.log(nameObject.keys)

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
    let regExp = new RegExp([event.target.value],'i', 'S')
    let result = []
    for(let record in persons){
      if(regExp.test(persons[record].name)){
        result.push(persons[record])
        setMatch([...result])
      }
    }
  }

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