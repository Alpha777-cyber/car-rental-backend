require('dotenv').config();      // 1. Load environment variables
const express = require('express');
const cors = require('cors');    // 2. Enable cross-origin requests
const helmet = require('helmet'); // 3. Add security headers
const morgan = require('morgan'); // 4. Log HTTP requests
const connectedDB = require('./config/db');
const routes = require('./routes');
const app = express();
const {errorHandler} = require('./middlewares/err.middleware')

connectedDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.use('/api',routes);

app.get('/',(req,res)=>{
    res.json({
        success: true,
        message: 'the app is running'
    });
});


//global error handling
app.use(errorHandler)

module.exports = app;