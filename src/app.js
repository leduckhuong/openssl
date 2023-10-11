const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.static(path.join(__dirname, 'publics')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SERCRET_COOKIES));

module.exports = app;