const express = require('express');

const api = require('./app-logic/api');
const methods = require('./app-logic/methods');
const db = require('./database/db-calls');

var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.get('/get-arrival-estimates', (req, res) => {
    let routes = (req.query.routes) ? req.query.routes : null;
    let stops = (req.query.stops) ? req.query.stops : null;   
    
    console.log(typeof routes);
    api.getArrivalEstimates(routes, stops).then(response => {
        res.send(response.data.data);    
    })
    .catch(err => {
        console.log(err);
    })
});

app.get('/routing', (req, res) => {
    let source = parseInt(req.query.source);
    let destination = parseInt(req.query.destination);

    if (isNaN(source) || isNaN(destination)) { res.status(500).json({error : 'Invalid source or destination'}) }

    methods.sourceToDestination(source, destination, (err, response) => {
        if (err) console.error(err);
        else res.status(200).json({ routes: response });
    });
})

app.get('/get-all-stops', (req, res) => {
        db.getAllStopsData((err, response) => {
        if (err) res.err();
        res.send(response)
    });
})

app.listen(5000, (err) => {
    if (err) console.error(err);
    console.log('Server started on port 5000');
})