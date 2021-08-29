const PORT = 3000
const express = require('express')
const nodemailer=require("nodemailer")
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path")
const app = express()

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

/* app.get('/', (req,res) => {
    res.send({});
}) */

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.post("/api/nodemailer",(req,res)=>{

    let data=req.body

/*     let mailOptions = {
        from:`SimpleSST ${process.env.EMAIL_USER}`,
        to: data.to,
        replyTo: process.env.EMAIL_USER,
        subject: data.subject,
        html: data.html ,
    }; */
  
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
    
/* if (process.env.NODE_ENV !== 'development') { */

    app.use(express.static(path.join(__dirname,"react-dashboard/build")))
    
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,"react-dashboard/build/index.html"), (err)=>{
            if(err) {
                res.status(500).send(err)
            }
        });
    })
    
/* } */

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`)
})


