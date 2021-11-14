import {React, useEffect, useState} from 'react'
import {Filter} from './components/Filter'
import axios from 'axios' 

const App = () => {
  const [countries, setGlobalData] = useState([])

  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
            setGlobalData(response.data)
        })
  }, [])

  return(
    <Filter countries={countries} />
  )
}

export default App;
