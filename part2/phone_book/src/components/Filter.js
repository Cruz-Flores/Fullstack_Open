import React from 'react'
import Person from './Person.js'

const Filter = ({match, filter, handleFilterChange}) => {
  return(
    <div>
      <p>Filter shown with</p> 
      <input
      type='text'
      placeholder="Enter name to search"
      value={filter} 
      onChange={handleFilterChange}/>
      {match.length > 0 && 
        <ul>
          {match.map(
            person => (
              <Person 
                key={`${person.name} 1`} 
                person={person} />
            ))}
        </ul>
      }
    </div>
  )
}

export default Filter

