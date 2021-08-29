const PORT = 3000
const fs = require('fs')
const express = require('express')
const path = require("path")
const app = express()

const users = [
    {name:'Rodrigo'},
    {name:'Barbosa'},
]


app.set('views', path.join(__dirname,'views')) 
app.set('view engine', 'ejs') 

app.get('/', (req, res) => {
    res.render('user',{users})
  })

app.listen(PORT, () => {
    console.log(`Example app listening at ${PORT}`)
})