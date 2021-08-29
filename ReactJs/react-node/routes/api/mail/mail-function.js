const xl = require('excel4node');


module.exports = {

    transport: nodemailer.createTransport({
        host: "smtp.umbler.com",
        port: 587,
        secure:false,
        auth:{
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASSWORD
        }
    }),
    

}






/* 
function generetId() {
    return Math.random().toString(36).substr(2,9)
} */