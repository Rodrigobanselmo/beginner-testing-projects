require('dotenv').config();;
const express = require('express')
const apiRoute = require("./routes/api")
const path = require("path")
const socketIo = require('socket.io')
const app = express()


app.use('/api', apiRoute) 
app.use('/', express.static(path.join(__dirname,"public")))


const server = app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`)
})

const messages = []

const io = socketIo(server); 

io.on('connection', (socket) => {
    console.log('new connection')

    socket.emit('update_messages', messages)

    socket.on('new_message', (data)=>{
        messages.push(data.msg)

        io.emit('update_messages', messages)
    })
})
