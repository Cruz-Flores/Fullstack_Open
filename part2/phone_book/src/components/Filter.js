import React from "react";

const Filter = ({match, filter, handleFilterChange}) => {
  return(
    <div>
      <p>Filter shown with</p> 
      <input
      placeholder="Enter name to search"
      value={filter} 
      onChange={handleFilterChange}/>
      {match.length > 0 && 
        <ul>
        {match.map(person => <li key={`${person.name} 1`}>{person.name} {person.number}</li>)}
        </ul>
      }
    </div>
  )
}

export default Filter
