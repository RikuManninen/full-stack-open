import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  })

  const countriesToShow = searchWord
    ? countries.filter(c => c.name.toLowerCase().includes(searchWord.toLowerCase()))
    : []

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }

  return (
    <>
      find countries <input
        value={searchWord}
        onChange={handleSearchChange}
      />
      {
        countriesToShow.length === 1 
          ? <div>
            <h1>{countriesToShow[0].name}</h1>
            <p>capital {countriesToShow[0].capital}</p>
            <p>population {countriesToShow[0].population}</p>
            <h2>languages</h2>
            <ul>
              {countriesToShow[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={countriesToShow[0].flag} alt={'flag'} height={'150'}/>
          </div>

        : countriesToShow.length <= 10 
          ? countriesToShow.map(country => {
            return (
              <div key={country.name}>
                {country.name}
                <button onClick={() => setSearchWord(country.name)}>show</button>
              </div>
            )
          })

        : <div>Too many matches, specify another filter</div>
      }
    </>
  )
}

export default App;
