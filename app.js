const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const APIKey = require('./models/APIkey');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')

//setup of express app
const app = express();

//setup for the view engine
app.set('view engine', 'ejs');

//setup of db
const url = APIKey;
mongoose.connect(url)
    .then(() => {app.listen(3000);})
    .catch((err) => {console.log('failed to connect');})


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// log request and response data
app.use((req, res, next) => {
    // console.log('NEW REQUEST WAS MADE');
    console.log('Host: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
});

// home
rootname = __dirname;
app.get('/', (req, res) => {

    res.redirect('/blogs');

});

// about
app.get('/about', (req, res) => {

    // res.send('<p> Hellow there </p>');
    // res.sendFile('/about.html', {root: rootname});
    res.render('about', {title : 'ABOUT'});

});

// blogs
app.use('/blogs', blogRoutes);

//404-error
app.use((req, res) => {
    res.status(404).render('404', {title : 'ERROR'});
})