/* Smart Funge befunge IDE version 0.0.1
 * Graphical user interface
 */

// global app object, should be initialized
// by app.js
let app = null;

// initializer
function init() {
    // make sure the app isn't loaded
    if (app.loaded) return;
}

// exports
module.exports = {
    init(theApp) {
        app = theApp;
        init();
    }
}