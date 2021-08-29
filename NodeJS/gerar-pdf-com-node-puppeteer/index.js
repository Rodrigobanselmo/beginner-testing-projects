const express = require('express')
const path = require('path')
const app = express()
var ffmpeg = require('fluent-ffmpeg');


// app.get('/', (request, response) => {

//     // const filePath = path.join(__dirname, "print.ejs")
//     response.send('Hello')
// })

ffmpeg()
  .input('/video.m4v')
  .inputFormat('m4v')
  .input('/path/to/file.avi')
  .inputFormat('avi');

app.listen(3000)
