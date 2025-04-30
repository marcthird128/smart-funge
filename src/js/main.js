/* Smart Funge befunge IDE version 0.0.1
 * Main entry point
 */

// utils
const utils = require('./utils.js');

// main function just
// in case we dont want to
// start instantly
// MUST RUN AFTER WINDOW LOAD
async function main() {
    // if its already loaded
    // then dont do it again
    if (window.loaded) {
        utils.warn('Main called twice!');
        return;
    }

    // app starting
    utils.log('====================');
    utils.log('Starting Smart Funge');
    utils.log('====================');
    utils.log();

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
    utils.log('Config loaded sucessfully');

    // load assets
    utils.log('Loading assets...');
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

    // wait for them to load
    await loader.promise;
    utils.log('Assets loaded sucessfully');

    // ------------------
    //   ON ASSET LOAD
    // ------------------

    // initialize GUI
    utils.log('Initializing GUI...');
    const gui = require('./gui.js');
    gui.init();
    utils.log('GUI initialized sucessfully');

    // everything initialized!
    app.loaded = true;
    utils.log();
    utils.log('==============================');
    utils.log('Smart Funge loaded sucessfully');
    utils.log('==============================');
    utils.log();

    // delete window main
    // object so it wont
    // get called again
    window.main = () => utils.warn('Main called twice!');
}

window.main = main;