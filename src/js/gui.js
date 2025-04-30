/* Smart Funge befunge IDE version 0.0.1
 * Graphical user interface
 */

// utils
const utils = require('./utils.js');

// uses Google Material Icons
// for the icons

// global app object, should be initialized
// by app.js
const app = require('./app.js');

// gui functions and data
const gui = {

}

// helper: turn image 

// initializer
gui.init = function() {
    // make sure the app isn't loaded
    if (app.loaded) {
        utils.warn('gui.init called twice!');
        return;
    }

    // first, clear body
    document.body.innerHTML = '';

    // set title
    document.title = 'Smart Funge';
}

// set the app gui property
app.gui = gui;

// export gui as well
module.exports = gui;