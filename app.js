//? dependencia de express
const express = require('express')

//? Initial configs

const port = 9000
const app = express()
//?Habilitar recibir formato JSON
app.use(express.json())

const peliDB = []
//? API Pelicula
// {
    // id: 1.
    // title: "Pacific Rim",
    // year: 2012,
    // director: "Guillermo del Toro"
    // genre: ['action', 'Sci-fi'] //opcional
// }
let id = 0

app.get('/', (req, res) => {
    res.json({
        message: 'OK'
    })
})

//? /peli /peli/:id
//? Rutas de PELI's
app.get('/pelis', (req, res) =>{
    res.status(200).json(peliDB)
})

app.post('/pelis', (req, res) => {
    const {title, year, director, genre} = req.body

    if(title && year && director){
        const newPeli = {
            id: id++,
            title,
            year,
            director,
            genre
        }
        peliDB.push(newPeli)
        res.status(200).json(newPeli)
    } else{
        res.status(400).json({message: 'Invalid data'})
    }

})

//Buscaremos el valor por si id
app.get('/pelis/:id', (req, res)=> {
    const id = req.params.id;

    const peli = peliDB.find(item => item.id == id)

    if(peli){
        res.status(200).json(peli)
    } else {
        res.status(404).json({message: 'Invalid ID'})
    }


})

app.listen(port, () =>{
    console.log(`Server started at port ${port}`)
})
