/* Smart Funge befunge IDE
 * Main entry point
 */

// import the required modules
const gui = require('./gui.js');
const engine = require('./engine.js');

// make the app
const app = {
    loaded: false,
    version: '0.0.1'
}

module.exports = {
    app, // export the app object
}