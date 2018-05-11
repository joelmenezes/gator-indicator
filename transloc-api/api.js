const axios = require('axios');

// Set defaults for Transloc API requests.
axios.defaults.headers.get['X-Mashape-Key'] = '84AqoE1KCImshBFBXYICXBMaLJVVp1ZlNPhjsnoWHxpEPW3x1S';
axios.defaults.headers.get['Accept'] = 'application/json';



// Get stops data
async function getStopsData () {
    let result;
    try { result = await axios.get("https://transloc-api-1-2.p.mashape.com/stops.json?agencies=116&callback=call"); }
    catch (e) { console.error(e); }
    return result;
}

// Get Routes data
async function getRoutesData () {
    let result;
    try { result = await axios.get("https://transloc-api-1-2.p.mashape.com/routes.json?agencies=116&callback=call"); }
    catch (e) { console.error(e); }
    return result;
}


module.exports.getStopsData = getStopsData;
module.exports.getRoutesData = getRoutesData;