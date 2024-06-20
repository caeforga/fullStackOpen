const Filter = ({ text, handleNameFiltered }) => {

    return (
        <>
            filter show with: <input value={text} onChange={handleNameFiltered} />
        </>
    )
}

export default Filter