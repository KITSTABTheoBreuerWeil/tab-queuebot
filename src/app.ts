import * as express from 'express';
import * as bodyParser from 'body-parser';

import { infoController, webhookController } from './controllers';

export const app = express();

// configure middlewares
app.use(bodyParser.json())

// routes
app.get('/info', infoController);
app.get('/trigger', webhookController);
app.post('/webhook', webhookController);
