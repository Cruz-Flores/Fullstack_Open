import {React, useEffect, useState} from 'react'
import axios from 'axios' 
import { Weather } from './Weather'

const OneMatch = ({countrie}) =>{
    const [weather, setWeather] = useState({})
    console.log('render one match')
    console.log(Object.keys(weather).length)
    console.log(weather, 'weathercomponent')

    useEffect(()=>{
        console.log('effect')
        const params = {
            access_key: process.env.REACT_APP_API_WEATHER_KEY,
            query: countrie.capital[0]
          }
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
            const apiResponse=response.data;
            console.log('promise fullfilled')
            console.log(apiResponse, 'apiresponse effect')
            setWeather(apiResponse)
            })
    }, [])

    return(
        <>
            <h2>{countrie.name.official}</h2>
            <p>Capital: {countrie.capital} <br /> Population: {countrie.population}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(countrie.languages)
                    .map(language =>
                         <li key={language}>{language}</li>)}
            </ul>
            <img src={countrie.flags.png} alt='flag of countrie' />
            {Object.keys(weather).length>0 && <Weather weather={weather} />}
        </>
    )
}

export {OneMatch}