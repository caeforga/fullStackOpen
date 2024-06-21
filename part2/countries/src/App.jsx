import { useState, useEffect } from 'react'
import countriesService from './services/Countries'
import Countries from './components/Countries'
import './App.css'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect (() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const countriesFiltered = search ?
    countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <>
      Find countries: <input type="text" placeholder='write a country' value={search} onChange={handleSearch} />
      
      {search === '' ? null :
        countriesFiltered.length > 10 ? 'Too many matches, specify another filter' :
        <Countries countries={countriesFiltered} />
      }
    </>
  )
}

export default App
