import express from 'express';
import bodyParser from 'body-parser';

import { webhookController } from './controllers';

export const app = express();

// configure middlewares
app.use(bodyParser.json())

// routes
app.get('/trigger', webhookController)
app.post('/webhook', webhookController);
