var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

const db = require('./models/MongoDBSingleton');
db.connect().then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Database connection failed', err);
});

var todoRouter = require('./routes/todoRouter');
var userRouter = require('./routes/userRouter');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS configuration
const corsOptions = {
    origin: process.env.REACT_URI, // Allow only requests from localhost:3000
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions))

//app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

module.exports = app;