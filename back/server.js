const express = require('express');
const app = express();
const port = 8080;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

(async () => {
    const user = await prisma.user.create({
        data: {
          nome: 'Caio',
          ra: '127513',
          email: 'ra127513@uem.br',
          verificado: true,
          senha: '1234',
          admin: false,
          imagem: 'path'
        },
      })
})