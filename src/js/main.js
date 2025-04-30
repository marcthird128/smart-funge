/* Smart Funge befunge IDE version 0.0.1
 * Main entry point
 */

// first, get the global
// app object
const app = require('./app.js');

// then load the config
require('./config.js');
app.config.default();
app.config.override();
app.config.save();

// put it in global var
window.app = app;

// when the window loads:
window.addEventListener('load', () => {
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
                text.innerText = `${percent}%`;
            }
        }

        // run every 10th second
        loadInterval = setInterval(frame, 100);

        // initial effect iteration
        frame();
    })();

    // wait for the assets to load
    loader.promise.then(() => {

        // done!
        // test
        document.body.innerHTML = '<span>Done</span>';
    });
});