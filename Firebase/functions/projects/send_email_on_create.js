const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.emailWelcome = functions.firestore.document("users/{user}").onCreate((snap, context)=>{
  // const email = snap.data().email
  // const name = snap.data().name
  // console.log('snap.data()',snap.data())
  return send()
})

function send() {
 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "rodrigoanselmo@usp.br",
    subject: "Convite de participaçao da equipe",
    text: "oi Rodrigo"
  };

  transporter.sendMail(mailOptions, (err, data) => {
    return console.log(9)
  });
}

//firebase-tools deploy --only functions