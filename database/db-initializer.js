const sqlite3 = require('sqlite3').verbose();

const api = require('../transloc-api/api');
const dbCalls = require('./db-calls');

let initializeDB = () => {
    api.getStopsData().then((res) => {
        dbCalls.createStopsTable();
        let stops = res.data.data;
        dbCalls.insertStopsData(stops);
        dbCalls.closeDBConnection();
    });
    
    api.getRoutesData().then((res) => {
        console.log(res.data.data);
    });
}

//initializeDB();


api.getRoutesData().then((res) => {
    console.log(res.data.data['116'][0]);
});