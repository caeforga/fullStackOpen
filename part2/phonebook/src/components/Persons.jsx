const Persons = ({personsFiltered}) => {
    return (
        <ul>
        {personsFiltered.map(person =>
            <li key={person.name}>{person.name} {person.number}</li>
        )}
        </ul>
    )
    }

export default Persons