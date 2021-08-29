const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();

const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");


// const client = require('twilio')(TWILIO_ID,TWILIO_SK)

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const CLIENT_ID = '1044188074333-jl4jdvj4etm2h7cl92bq6v0da325827b.apps.googleusercontent.com';
const CLIENT_SECRET = 'VVVsnTU2FQrUFwsVCEWUl2Ea';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04R46YLq33tB9CgYIARAAGAQSNwF-L9IrroXDfIv9F5HBcPCbwXBQErJeS4wWehTe4FyBumeGrRCd_wSddyvnW4ioP7QmR6jDGhY';

const app = express();
app.use(cors({ origin: true }));

app.post("/", (req, res) => {
  const { body } = req; //to, subject, html
  const isValidMessage = body.to && body.html && body.subject;

  if (!isValidMessage) {
    return res.status(400).send({ message: "Ocorreu um erro ao enviar o email." });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'rodrigobanselmo@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
    }
  });

  const mailOptions = {
    from: 'App Reconecta',
    replyTo: process.env.EMAIL_USER,
    subject:body.subject,
    html: body.html,
    to: body.to,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "error " + err.message });
    }

    return res.send({ message: "email sent" });
  });
});

module.exports.mailer = functions.https.onRequest(app);

//npx firebase-tools deploy --only functions