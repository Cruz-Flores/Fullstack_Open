import {React, useState} from 'react'

const CountrieOnList = ({countrie}) => {
  const [show, setShow] = useState(false)

  const onShow = () => {
    setShow(!show)
  }

    return(
      <>
        <li>
          {countrie.name.official}
          <button onClick={onShow}>show</button>
        </li>
        {show && 
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
        </>}
      </>
    )
}

export {CountrieOnList}

      