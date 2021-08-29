const PORT = 3000
const express = require('express')
const path = require("path")
const app = express()
require('dotenv').config()

const data = {
    x:1,
    y:2
}

app.get('/all', (req,res) => {
    res.send(data);
})

    app.use(express.static(path.join(__dirname,"react-dashboard/build")))
    
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,"react-dashboard/build/index.html"), (err)=>{
            if(err) {
                res.status(500).send(err)
            }
        });
    })
    
app.listen(PORT, () => {
    console.log(`Example app listening at ${PORT}`)
})