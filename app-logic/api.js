const axios = require('axios');
const qs = require('qs');

// Set defaults for Transloc API requests.
axios.defaults.headers.get['X-Mashape-Key'] = '84AqoE1KCImshBFBXYICXBMaLJVVp1ZlNPhjsnoWHxpEPW3x1S';
axios.defaults.headers.get['Accept'] = 'application/json';



// Get stops data
async function getStopsData() {
    let result;
    try {
        result = await axios.get("https://transloc-api-1-2.p.mashape.com/stops.json", {
            params: {
                agencies: 116
            }
        });
    }
    catch (e) { console.error(e); }
    return result;
}

// Get Routes data
async function getRoutesData() {
    let result;
    try {
        result = await axios.get("https://transloc-api-1-2.p.mashape.com/routes.json", {
            params: {
                agencies: 116
            }
        });
    }
    catch (e) { console.error(e); }
    return result;
}

// Get Segments data
async function getSegmentsData() {
    let result;
    try {
        result = await axios.get("https://transloc-api-1-2.p.mashape.com/segments.json", {
            params: {
                agencies: 116
            }
        });
    }
    catch (e) { console.error(e); }
    return result;
}


// Get Arrival Estimates
// Query example = https://transloc-api-1-2.p.mashape.com/arrival-estimates.json?agencies=116&callback=call&routes=asdasd%2Casdsda&stops=asdsad%2Casdsaddassda
async function getArrivalEstimates(routes, stops) {
    let result;
    let params = {};
    params.agencies = 116;
    if (routes) params.routes = routes;
    if (stops) params.stops = stops;
    try {
        result = await axios.get("https://transloc-api-1-2.p.mashape.com/arrival-estimates.json", {
            params
        });
    }
    catch (e) { console.error(e); }
    return result;
}


let arrToString = (routes) => {
    return routes.map(route => '' + route).join(',');  
}

module.exports.getStopsData = getStopsData;
module.exports.getRoutesData = getRoutesData;
module.exports.getSegmentsData = getSegmentsData;
module.exports.getArrivalEstimates = getArrivalEstimates;