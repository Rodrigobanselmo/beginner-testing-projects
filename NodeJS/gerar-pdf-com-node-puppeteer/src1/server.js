const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()
const cors = require('cors');
const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },
];

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/pdf', (request, response) => {
    const body = request?.body
    console.log(body)
    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { passengers,body }, (err, html) => {
        if(err) {
            return response.send('Erro na leitura do arquivo')
        }

        const options = {
            format: "A4"
        }


        pdf.create(html, options).toBuffer(function(err, buffer){
            if (err) {
                return response.send("Erro ao gerar o PDF")
            }

            return response.send(buffer)
        });

        

    })
})

app.listen(3002)


// criar o pdf
// pdf.create(html, options).toFile("report.pdf", (err, data) => {
//     if (err) {
//         return response.send("Erro ao gerar o PDF")
//     }

//     // enviar para o navegador
//     return response.send(html)
// })

// response.sendFile(`${__dirname}/report.pdf`)
