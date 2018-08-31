// load app configuration into environment
require('dotenv').config();

const app = require('./app')
app.listen(process.env.PORT || 5000);
