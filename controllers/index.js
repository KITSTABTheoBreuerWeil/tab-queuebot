const { requeue } = require('../lib/requeue');

const webhookController = async (request, response) => {
  let statusCode = 201;

  try {
    await requeue();
  }
  catch (error) {
    statusCode = 400;
    console.error(error);
  }

  response.sendStatus(statusCode);
};

module.exports = { webhookController };
