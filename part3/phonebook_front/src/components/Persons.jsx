const Persons = ({personsFiltered, handlePersonDelete}) => {
    return (
        <ul>
        {personsFiltered.map(person =>
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handlePersonDelete(person.id)}>Delete</button>
            </li>
        )}
        </ul>
    )
    }

export default Persons