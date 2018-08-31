const express = require('express');
const bodyParser = require('body-parser')
const controllers = require('./controllers');

const app = express();

// configure middlewares
app.use(bodyParser.json())

// routes
app.get('/', (request, response) => {
  response.send('<h1>Queuebot is live!</h1>');
  controllers.requeue();
});

app.post('/', controllers.requeue);

module.exports = app;
