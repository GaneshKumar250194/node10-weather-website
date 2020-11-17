const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { deflateRawSync } = require('zlib');

//Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars Engine and Views Locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Static Directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'GaneshKumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'GaneshKumar'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'This is some helpful text',
        name: 'GaneshKumar'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please Enter the Address Term in URL'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error: error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
            forecast: forecastData,
            location: location,
            address: req.query.search
            })
        })
    })
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Cochin',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) { 
        return res.send({
            error: 'Please Enter the Search Term in URL'
        })
    } 
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'GaneshKumar',
        error: 'Page Not Found.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'GaneshKumar',
        error: 'Help Article Not Found.'
    })
})

app.listen(port, (req, res) => {
    console.log('Server is up on port ' + port)
});