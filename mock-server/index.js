const express = require('express');
const bodyParser = require('body-parser');
const { matches } = require('lodash');

const app = express();

app.use(bodyParser.json());

app.get('/repos/owner/repository/pulls', (request, response) => {
  response.json(require('./data/get/response.json'));
});

app.patch('/repos/owner/repository/pulls/:id', (request, response) => {
  console.log(request.body);

  try {
    const expected = require(`./data/patch/${request.params.id}/request`);
    if (!matches(request.body)(expected)) return response.sendStatus(400);
  } catch (error) {
    return response.sendStatus(400);
  }


  response.json(require(`./data/patch/${request.params.id}/response`));
});

app.listen(6789);
