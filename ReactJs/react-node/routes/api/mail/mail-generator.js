const express = require('express')
const nodemailer=require("nodemailer")
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require("path")

require('dotenv').config()

const transport=nodemailer.createTransport({
  host: "smtp.umbler.com",
  port: 587,
  secure:false,
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
  }
})

router.use(cors())
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())


router.post('/invite-members', (req, res) => {

  let data=req.body

  transport.sendMail({
    from:`SimpleSST ${process.env.EMAIL_USER}`,
    to: data.to,
    replyTo: process.env.EMAIL_USER,
    subject: data.subject,
    html: data.html ,
  }).then((info)=>{
      console.log("enviada")
      res.send("Mensagem enviada corretamente")
  }).catch((error)=>{
      console.log('Error occurred');
      console.log(error.message);
      res.send("Alguma erro aconteceu")
  })
});

router.get('/excel/fetch', (req, res) => {
    console.log('3')
  res.sendFile(`${__dirname}/files/ExcelFile.xlsx`)
  console.log('2')
})

module.exports=router;
