require('dotenv').config();;
const express = require('express')
const app = express()
const fs = require('fs')
const path = require("path")
const userRouter = require("./routes/userRouter")

app.use('/user', userRouter) 
//app.use('/', express.static(path.join(__dirname,"public")))

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`)
})