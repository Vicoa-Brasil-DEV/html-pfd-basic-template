const express = require('express');
const pdf = require('html-pdf')
const ejs = require('ejs');

const app = express();


app.use(express.json())

app.get('/', (request, response) => {

  ejs.renderFile('./templates/index.ejs', { name: 'Acho que deu certo' }, (err, html) => {
    if (err) {
      return response.status(500).json({ message: 'Error in server!' })
    }

    const options = {
      format: 'A4',
      border: {
        rigth: '8'
      }
    };
    pdf.create(html, options).toFile('./uploads/report.pdf', (error, res) => {
      if (!error) {
        return response.json({ message: 'PDF Generated!' })
      } else {
        return response.json({ message: 'Fail in generated PDF!' })
      }
    });
  });

  app.get('/donwload', (request, response) => {
    response.type('pdf');
    response.download('./uploads/report.pdf');
  })
})

app.listen(3333);