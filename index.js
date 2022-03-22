const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express')
const { status } = require('express/lib/response')
const app = express()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses)
app.use('/', home)

// configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail server name: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enable...')
}

app.use(logger)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('creation de serveur dans un port specifique'))