const express = require('express')
const projectRouter = require('./data/api/projectRouter.js')

const server = express();




server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Lambda sprint challenge week1</h2>`);
  });

  server.use('/api/projects',projectRouter);

module.exports = server;