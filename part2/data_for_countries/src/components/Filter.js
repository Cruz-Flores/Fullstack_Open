import {React, useState} from "react";
import {OneMatch} from './OneMatch.js'
import {CountrieOnList} from './CountrieOnList.js'

const Filter = ({countries}) => {
  const [ filter, setFilter ] = useState('')
  const [match, setMatch] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if(!event.target.value.length>0) {
      setMatch([])
    }
    else{
      const coincidences = countries.filter(countrie => {
        const textToSearch = event.target.value.toLowerCase()
        const countrieToCompare = countrie.name.official.toLowerCase()
        return countrieToCompare.includes(textToSearch)
      })    
      setMatch(coincidences)
    }
  }

  return(
    <>
      <p>Filter shown with</p> 
      <input
      placeholder="Enter countrie to search"
      value={filter} 
      onChange={handleFilterChange}/> 
      {match.length > 10 ? 
      <p>Too many matches, specify another filter</p>:
      match.length === 1? <OneMatch countrie={match[0]} />:
      <ul>
          {match.map(countrie => 
            <CountrieOnList key={countrie.name.official} countrie={countrie} />
          )}
      </ul>  
      }     
    </>
  )
}

export {Filter}

