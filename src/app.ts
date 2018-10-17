import * as express from 'express';
import * as bodyParser from 'body-parser';

import { infoController, webhookController } from './controllers';
import { dependencyInjector } from './middlewares';

export const app = express();

/* configure middlewares */
app.use(bodyParser.json())
app.use(dependencyInjector)

/* routes */
app.get('/info', infoController);
app.get('/trigger', webhookController);
app.post('/webhook', webhookController);
