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

let readRoutesFromStopId = (stopId, callback) => {
    db.get(`SELECT routes from stops where stop_id = ${stopId}`, (err, row) => {
        if (err) callback(err);
        else callback(null, row);
    })
}

let createRoutesTable = () => {
    db.serialize(() => {
        db.run(`DROP TABLE IF EXISTS routes`);
        db.run(`CREATE TABLE IF NOT EXISTS routes (
            route_id integer PRIMARY KEY,
            description text,
            short_name text,
            long_name text,
            is_active text,
            stops text,
            forward_segments text,
            backward_segments text
        )`, err => { if(err) console.error(err); });
    });
}

let insertRoutesData = (routes) => {
    db.serialize(() => {
        let stmt = db.prepare('INSERT INTO routes VALUES (?,?,?,?,?,?,?,?)');
        routes.forEach(route => {
            let segments = getForwardAndBackwardSegments(route.segments);
            stmt.run(parseInt(route.route_id), route.description, route.short_name, route.long_name, route.is_active, arrToString(route.stops), segments.forward, segments.backward);
        });
        stmt.finalize();
    })
}

let createSegmentsTable = () => {
    db.serialize(() => {
        db.run(`DROP TABLE IF EXISTS segments`);
        db.run(`CREATE TABLE IF NOT EXISTS segments (
            segment_id integer PRIMARY KEY,
            polyline_encoding text
        )`, err => { if(err) console.error(err); });
    });
}

let insertSegmentsData = (segments) => {
    db.serialize(() => {
        let stmt = db.prepare('INSERT INTO segments VALUES (?,?)');
        for (segment in segments) {
            stmt.run(parseInt(segment), segments[segment]);
        }
        stmt.finalize();
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

let getForwardAndBackwardSegments = (segments) => {
    let forward = [];
    let backward = [];
    let parsedSegments = {};

    segments.forEach(segment => {
        if (segment[1] === "forward") forward.push(segment[0]);
        if (segment[1] === "backward") backward.push(segment[0]);
    });

    parsedSegments.forward = arrToString(forward);
    parsedSegments.backward = arrToString(backward);

    return parsedSegments;
}

module.exports.createStopsTable = createStopsTable;
module.exports.insertStopsData = insertStopsData;

module.exports.createRoutesTable = createRoutesTable;
module.exports.insertRoutesData = insertRoutesData;


module.exports.createSegmentsTable = createSegmentsTable;
module.exports.insertSegmentsData = insertSegmentsData;


module.exports.readStops = readStops;
module.exports.closeDBConnection = closeDBConnection;

module.exports.readRoutesFromStopId = readRoutesFromStopId;