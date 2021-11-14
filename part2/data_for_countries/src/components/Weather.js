import React from 'react'

const Weather = ({weather}) => {
    console.log('weather component', weather)
    return(
        <>
            <h3>Weather in {weather.location.name}</h3>
            <p><strong>tempretature:</strong> {weather.current.temperature} Celsius</p>
            <img src={weather.current.weather_icons} alt='weather icon' />
            <p><strong>wind</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </>
    )
}

export {Weather}

