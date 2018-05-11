const sqlite3 = require('sqlite3').verbose();

//Create DB if not exists.
let db = new sqlite3.Database('./db/gator-indicator.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error(err);
    console.log('Database connection successful');
});



//Close DB connection.
db.close((err) => {
    if (err) console.error(err);
    console.log('Database connection closed successfully');
})