const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.set('port', 3000);

app.listen(app.get('port'), () => console.log(`Server listen on port ${app.get('port')}`));