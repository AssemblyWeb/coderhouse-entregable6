const express = require('express')
const errorHandler = require('./src/middlewares/errorHandler.js')
const morgan = require('morgan')

const app = express()

//routes
const router = require('./src/routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// VIEW
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs') // registra el motor de las plantillas
app.set('views', './views') // busca la carpeta de las plantillas

app.use('/', router)

app.get('/', (req, res) => {
    res.json({ hello })
})


// ERROR handlers
app.use(errorHandler)
app.use(morgan('dev'))

module.exports = app


