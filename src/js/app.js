/* Smart Funge befunge IDE version 0.0.1
 * App object container
 */

// create the app object
// and initialize it with
// default values
const app = {
    loaded: false, // whether Smart Funge has been loaded
    debug: false, // debug mode, provides better errors and stuff
    assets: {}, // assets object
    config: {object: {}} // in case config isnt loaded
};

// just export the app object
// since modules are not run
// twice, all modules importing
// this file will reference the 
// same object
module.exports = app;