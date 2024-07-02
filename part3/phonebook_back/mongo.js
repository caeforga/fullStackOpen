const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    const password = process.argv[2]
    const url = `mongodb+srv://caeforga:${password}@app.xgdsnvv.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=app`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    }).catch(err => {
        console.error(err)
        mongoose.connection.close()
    })
} else if (process.argv.length < 5) {
    console.log('Insufficient arguments provided. Please provide the necessary arguments.')
    process.exit(1)
} else {
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    const url = `mongodb+srv://caeforga:${password}@app.xgdsnvv.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=app`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const person = new Person({
        name,
        number,
    })

    person.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    }).catch(err => {
        console.error(err)
        mongoose.connection.close()
    })
}
