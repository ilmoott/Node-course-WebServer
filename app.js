console.log('Hello World!');

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname +'/public'));

//custom middleware
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append log file.');
        }
    });
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', function(){
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', function(req, res){
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Hello! Welcome to our website.'
    });
});

app.get('/about',function(req, res){
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, function(){
    console.log('server running on port 3000');
});