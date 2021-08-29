// const express = require("express");

const ffmpeg = require("fluent-ffmpeg");
const video = './video.mp4'

const ffmpeg_static = require('ffmpeg-static');

// const fs = require("fs");

ffmpeg.ffprobe(video,(err, metaData)=>{
  const { duration } = metaData.format
  console.log('duration',duration)

  const startingTime = parseInt(duration/2)
  const clipDuration = 5

  ffmpeg()
  .input(video)
  // .inputOptions([`-ss ${startingTime}`])
  // .outputOptions([`-t ${clipDuration}`])
  .noAudio()
  .output('./end_result.mp4')
  .on('end',()=>console.log('end'))
  .on('error',(err)=>console.log(err))
  .size('1280x720')
  .run()

})


// const fileUpload = require("express-fileupload");

// const app = express();

// const PORT = process.env.PORT || 5000

// // parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));

// // parse application/json
// app.use(express.json());

// //support parsing of application/x-www-form-urlencoded post data

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// ffmpeg.setFfmpegPath(ffmpeg_static.path);
// // ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

// // ffmpeg.setFfprobePath("C:/ffmpeg/bin");

// // ffmpeg.setFlvtoolPath("C:/flvtool");

// console.log(ffmpeg);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/convert", (req, res) => {
//   //res.contentType(`video/${to}`);
//   //res.attachment(`output.${to}`

//   let to = req.body.to;
//   let file = req.files.file;
//   let fileName = `output.${to}`;
//   console.log(to);
//   console.log(file);

//   file.mv("tmp/" + file.name, function (err) {
//     if (err) return res.sendStatus(500).send(err);
//     console.log("File Uploaded successfully");
//   });

//   ffmpeg("tmp/" + file.name)
//     .withOutputFormat(to)
//     .on("end", function (stdout, stderr) {
//       console.log("Finished");
//       res.download(__dirname + fileName, function (err) {
//         if (err) throw err;

//         fs.unlink(__dirname + fileName, function (err) {
//           if (err) throw err;
//           console.log("File deleted");
//         });
//       });
//       fs.unlink("tmp/" + file.name, function (err) {
//         if (err) throw err;
//         console.log("File deleted");
//       });
//     })
//     .on("error", function (err) {
//       console.log("an error happened: " + err.message);
//       fs.unlink("tmp/" + file.name, function (err) {
//         if (err) throw err;
//         console.log("File deleted");
//       });
//     })
//     .saveToFile(__dirname + fileName);
//   //.pipe(res, { end: true });
// });

// app.listen(PORT);
