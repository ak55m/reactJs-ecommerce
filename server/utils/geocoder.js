// const NodeGeocoder = require('node-geocoder');
import NodeGeocoder from "node-geocoder";

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  // Optional depending on the providers
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// Using callback
export default geocoder