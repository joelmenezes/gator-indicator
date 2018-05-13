const sqlite3 = require('sqlite3').verbose();

const api = require('../transloc-api/api');
const dbCalls = require('./db-calls');

let initializeDB = () => {
    api.getStopsData().then((routesResult) => {
        dbCalls.createStopsTable();
        let stops = routesResult.data.data;
        dbCalls.insertStopsData(stops);
        return api.getRoutesData();
    }).then((routesResult) => {
        dbCalls.createRoutesTable();
        let routes = routesResult.data.data['116'];
        dbCalls.insertRoutesData(routes);
        return api.getSegmentsData();
    }).then((segmentsResult) => {
        dbCalls.createSegmentsTable();
        let segments = segmentsResult.data.data;
        dbCalls.insertSegmentsData(segments);
        dbCalls.closeDBConnection();
    })
    .catch(err => console.error(err));
}

initializeDB();