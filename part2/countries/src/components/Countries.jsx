const Countries = ({countries}) => {
    if (countries.length == 1) {
        return (
            <>
                <h1>{countries[0].name.common}</h1>
                <p>capital {countries[0].capital[0]}</p>
                <p>population {countries[0].population}</p>
                <p>area {countries[0].area}</p>
                <h2>languages</h2>
                <ul>
                    {Object.values(countries[0].languages).map((language, i) => <li key={i}>{language}</li>)}
                </ul>
                <img src={countries[0].flags.png} alt={countries[0].name.common} />
            </>
        )
    }
    return (
        <ul>
            {countries.map((country, i) => 
                <li key={i}>
                    {country.name.common}
                    <button type="button">show</button>
                </li>
            )}
        </ul>
    )
}

export default Countries