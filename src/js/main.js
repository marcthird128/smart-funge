/* Smart Funge befunge IDE version 0.0.1
 * Main entry point
 */

// first, get the global
// app object
const app = require('./app.js');

// ofc getting the config
// happens second
// but imma do that later

// put it in global var
window.app = app;

// when the window loads:
window.addEventListener('load', () => {
    // load assets
    const loader = require('./loader.js');
    loader.load();

    // effect
    let loadInterval;

    // one effect iteration
    function tellUser() {
        if (loader.complete) {
            clearInterval(loadInterval);
        } else {
            // for now
            const percent = loader.progress / loader.total * 100;

            document.body.innerHTML = `<span>Loading... ${percent}%, ${loader.progress}/${loader.total}</span>`;
        }
    }

    // run every 10th second
    loadInterval = setInterval(tellUser, 100);

    // initial effect iteration
    tellUser();

    // wait for the assets to load
    loader.promise.then(() => {

        // done!
        // test
        document.body.innerHTML = '<span>Done</span>';
    });
});