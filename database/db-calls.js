const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'gator-indicator.db');

// Create DB if not exists.
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database connection successful');
});

let createStopsTable = () => {
    db.serialize(() => {
        db.run(`DROP TABLE IF EXISTS stops`);
        db.run(`CREATE TABLE IF NOT EXISTS stops (
            stop_id integer PRIMARY KEY,
            description text,
            parent_station_id text,
            latitude text,
            longitude text,
            routes text,
            name text
        )`, err => { if(err) console.error(err); });
    });
}

let insertStopsData = (stops) => {
    db.serialize(() => {
        let stmt = db.prepare('INSERT INTO stops VALUES (?, ?, ?, ?, ?, ?, ?)');
        stops.forEach(stop => {
            stmt.run(parseInt(stop.stop_id), stop.description, stop.parent_station_id, stop.location.lat, stop.location.lng, arrToString(stop.routes), stop.name); 
        });
        stmt.finalize();
    })
}

let readStops = () => {
    db.all('SELECT * FROM stops', (err, rows) => {
        if (err) console.error(err);
        rows.forEach(row => {
            console.log(row.stop_id);
        });
    })
}

let closeDBConnection = () => {
    db.close((err) => {
        if (err) console.error(err);
        console.log('Database connection closed successfully');
    })
}

let arrToString = (routes) => {
    return routes.map(route => '' + route).join(',');
    
}

module.exports.createStopsTable = createStopsTable;
module.exports.insertStopsData = insertStopsData;
module.exports.readStops = readStops;
module.exports.closeDBConnection = closeDBConnection;
