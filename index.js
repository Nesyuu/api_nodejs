const express = require('express')
const app = express()
const ambulances = require('./data/ambulances.json')

app.get('/ambulances', (req , res) => {res.status(200).json(ambulances)})

app.listen(8080, () => {console.log('Server is on')})