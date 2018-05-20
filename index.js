const express = require('express');

const api = require('./app-logic/api');
const methods = require('./app-logic/methods');

let app = express();

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

app.listen(3000, (err) => {
    if (err) console.error(err);
    console.log('Server started on port 3000');
})