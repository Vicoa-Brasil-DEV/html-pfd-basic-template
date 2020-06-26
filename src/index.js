const express = require('express');
const pdf = require('html-pdf')
const ejs = require('ejs');

// Instancia o Express
const app = express();

// Autoriza o Express a usar Json
app.use(express.json())


// Essa rota cria o arquivo
app.get('/', (request, response) => {

  ejs.renderFile('./templates/index.ejs', { name: 'Acho que deu certo' }, (err, html) => {
    if (err) {
      return response.status(500).json({ message: 'Error in server!' })
    }

    // Opções que posso definir no pdf
    const options = {
      format: 'A4',
      border: {
        rigth: '10'
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

  //Essa rota serve para disponibilizar o arquivo
  app.get('/donwload', (request, response) => {
    response.type('pdf');
    response.download('./uploads/report.pdf');
  })
})

app.listen(3333);