import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState('')

  const countriesToShow = searchWord
    ? countries.filter(c => c.name.toLowerCase().includes(searchWord.toLowerCase()))
    : []

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data)) 
  }, [])

  useEffect(() => {
    countriesToShow.length === 1 && setCapital(countriesToShow[0].capital)
  }, [countriesToShow])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => setWeather(response.data))
  }, [capital, api_key])

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
            {weather.location &&
              <>
                <h2>Weather in {weather.location.name}</h2>
                <b>temperature: </b>{weather.current.temperature} Celcius
                <div>
                  {weather.current.weather_icons.map(icon => <img key={icon} src={icon} alt={'icon'}/>)}
                </div>
                <b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}
              </>
            }
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
