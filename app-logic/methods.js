let db = require('../database/db-calls');

let sourceToDestination = (source, destination, callback) => {
    let sourceRoutes = [];
    let destinationRoutes = [];
    let commonRoutes = [];

    db.readRoutesFromStopId(source, (err, res) => {
        if (err) callback(err);
        else {
            sourceRoutes = res.routes.split(',');
            db.readRoutesFromStopId(destination, (error, destinationResponse) => {
                if (error) callback(error);
                else {
                    destinationRoutes = destinationResponse.routes.split(',');
                    commonRoutes = sourceRoutes.filter(sR => { return destinationRoutes.indexOf(sR) > -1 })
                    .filter((route, index, common) => { return common.indexOf(route) === index})
                    console.log(commonRoutes);
                    callback(null, commonRoutes);
                }
            })
        }
    });
}

module.exports.sourceToDestination = sourceToDestination;