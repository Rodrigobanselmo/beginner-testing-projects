const express = require('express')
const apiRoute = require("./routes/api.js")
const app = express()

require('dotenv').config()

app.use('/api', apiRoute) 

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`)
})


