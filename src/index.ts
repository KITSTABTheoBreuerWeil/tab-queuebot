import { config as populateEnvironmentVariables } from 'dotenv';
import { getConfig } from './config';
import { app } from './app';

populateEnvironmentVariables();
getConfig();

app.listen(5000);
