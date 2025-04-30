/* Smart Funge befunge IDE version 0.0.1
 * Graphical user interface
 */

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
        console.warn('gui.init called twice!');
        return;
    }

    // first, clear body
    document.body.innerHTML = '';

    // set title and icon
    document.title = 'Smart Funge';
    let iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.href = app.assets['icon'].src;
    document.head.appendChild(iconLink);
}

// set the app gui property
app.gui = gui;

// export gui as well
module.exports = gui;