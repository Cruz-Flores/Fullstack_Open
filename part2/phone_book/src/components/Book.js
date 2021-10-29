import React from 'react'
import Person from './Person.js'


const Book = ({persons}) => {
    return(
        <ul>
        {persons.map(
          person => (
            <Person key={person.name} person={person}/>
          ))}
      </ul>
    )
}

export default Book