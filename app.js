
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forcast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const viewsPath = path.join(__dirname, './templates/views')
const directPath = path.join(__dirname, './public')
const partialsPath = path.join(__dirname, './templates/partials')

//set up handlebars template engine and views location
app.set('view eigine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up direct static to serve
app.use(express.static(directPath))

app.get('', (req, res) => {
    res.render('index.hbs', { title: "Weather", name: "Bharathi" })

})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "about me",
        name: "Bharathi",

    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', { message: "help", title: "help page", name: "Bharathi" })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'address must be provided' })
    } else {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error: error })
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error: error })
                }
                res.send({ forcast: forecastData, location: location, address: req.query.address })

            })
        })
    }

})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: "you must provide a search term" })

    } else {
        res.send({ products: [] })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', { title: "Error", errorbody: "Help page is not found", name: "Bharathi" })

})

app.get('*', (req, res) => {
    res.render('404.hbs', { title: "Error", errorbody: "My 404 Page", name: "Bharathi" })

})

app.listen(port, () => {
    console.log("Port is listening " + port)
})