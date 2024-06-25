import React, { useState, useEffect } from 'react'
import Weather from '../services/Weather'

const Countries = ({ countries, handleCountry }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (countries.length === 1) {
            const city = countries[0].capital[0];
            Weather.getWeather(city)
                .then(response => {
                    setWeather(response)
                })
        }
    }, [countries])

    const kelvinToCelsius = (kelvin) => kelvin - 273.15;

    const renderCountryDetails = (country) => {

        const temperature = weather ? kelvinToCelsius(weather.main.temp).toFixed(2) : null;
        const wind = weather ? weather.wind.speed : null;

        return (
            <>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>population {country.population}</p>
                <p>area {country.area}</p>
                <h2>languages</h2>
                <ul>
                    {Object.values(country.languages)
                        .map((language, i) => <li key={i}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common} />
                {weather && (
                    <>
                        <h2>Weather in {country.capital[0]}</h2>
                        <p>Temperature: {temperature} Celsius</p>
                        <p>Wind: {wind} m/s</p>
                    </>
                )}
            </>)
    }

    if (countries.length == 1) {
        return renderCountryDetails(countries[0]);
    }

    return (
        <ul>
            {countries.map((country) =>
                <li key={country.name.common}>
                    {country.name.common}
                    <button type="button" onClick={handleCountry}>show</button>
                </li>
            )}
        </ul>
    )
}

export default Countries