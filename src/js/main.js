/* Smart Funge befunge IDE version 0.0.1
 * Main entry point
 */

// main function just
// in case we dont want to
// start instantly
// MUST RUN AFTER WINDOW LOAD
function main() {
    // if its already loaded
    // then dont do it again
    if (window.loaded) {
        console.warn('Main called twice!');
        return;
    }

    // first, get the global
    // app object
    const app = require('./app.js');

    // put it in global var
    window.app = app;

    // then load the config
    require('./config.js');
    app.config.default();
    app.config.override();
    app.config.load();
    app.config.save();

    // load assets
    const loader = require('./loader.js');
    loader.load();

    // ---------------------------------
    //     LOADING EFFECT
    // ----------------------------------
    (() => {
        // interval ID
        let interval = -1;

        // loading elements
        const text = document.getElementById('loading-text');
        const strip = document.getElementById('loading-strip');

        // one effect iteration
        function frame() {
            if (loader.complete) {
                // on finish
                clearInterval(interval);
            } else {
                // percent
                const percent = loader.progress / loader.total * 100;

                // update DOM
                strip.style.width = `${percent}%`;
                text.innerText = `${Math.floor(percent)}%`;
            }
        }

        // run every 10th second
        loadInterval = setInterval(frame, 100);

        // initial effect iteration
        frame();
    })();

    // ------------------
    //      ONLOAD
    // ------------------
    loader.promise.then(() => {
        // init gui
        let gui = require('./gui.js');
        gui.init();

        // loaded
        app.loaded = true;
    });

    // delete window main
    // object so it wont
    // get called again
    window.main = () => console.warn('Main called twice!');
}

window.main = main;