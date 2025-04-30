/* Smart Funge befunge IDE version 0.0.1
 * Loads assets and/or modules
 */

// this file is required once
// and all assets will be loaded
// into the app object

// get the app object
const app = require('./app.js');

// assets to load
const assets = [
    {name: 'style', type: 'text', path: 'assets/style.css'},
    {name: 'icon', type: 'image', path: 'assets/icon.png'},
    {name: 'circle-arrow-right', type: 'image', path: 'assets/circle-arrow-right.svg'},
    {name: 'circle-play', type: 'image', path: 'assets/circle-play.svg'},
    {name: 'circle-pause', type: 'image', path: 'assets/circle-pause.svg'},
    {name: 'circle-stop', type: 'image', path: 'assets/circle-stop.svg'},
]

// loading object
const loader = {
    progress: 0,
    total: assets.length,
    complete: false
}

// create the load promise
let resolve;
loader.promise = new Promise(res => {
    resolve = res;
});

// check if done
function check() {
    if (loader.progress == loader.total) {
        loader.complete = true;
        resolve();

        return true;
    }

    return false;
}

// load an asset
function loadAsset(asset) {
    const {name, type, path} = asset;
    
    if (type == 'text') {
        // load the text with fetch
        fetch(path)
            .then(res => {
                if (!res.ok) {
                    // if could not load,
                    // promise will never be
                    // resolved
                    // and the app won't load
                    // TODO: add user notification of error
                    throw new Error(`Could not load text asset ${name} from ${path}: ${res.status} ${res.statusText}`);
                }

                return res.text();
            })
            .then(text => {
                console.log(`Loaded text asset ${name} from ${path}`);
                app.assets[name] = text;
                loader.progress++;
                check();
            })
            .catch(error => {
                throw new Error(`Could not load text asset ${name} from ${path}: ${error.message}`);
            })
    } else if (type == 'image') {
        // load the image
        const img = new Image();
        img.src = path;

        img.onload = () => {
            console.log(`Loaded image asset ${name} from ${path}`);
            app.assets[name] = img;
            loader.progress++;
            check();
        }
        img.onerror = () => {
            throw new Error(`Could not load image asset ${name} from ${path}`);
        }
    }
}

// load the objects
loader.load = function() {
    assets.forEach(asset => {
        // load each object
        loadAsset(asset);
    })
}

// export the state object
module.exports = loader;