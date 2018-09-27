import { config as populateEnvironmentVariables } from 'dotenv';
import { app } from './app';

populateEnvironmentVariables();
app.listen(5000);
