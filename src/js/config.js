/* Smart Funge befunge IDE version 0.0.1
 * Main entry point
 */

// config object
const config = {
    object: {}, // so it doest have an error
};

// set defaults
config.default = function() {
    config.object = {
        debugMode: false,
        saveLocally: true,
        stylesheet: 'assets/style.css'
    }
}

// auto detect and override from
// window.smartFungeConfig
config.override = function() {
    if (window.smartFungeConfig) {
        for (let n in window.smartFungeConfig) {
            config.object[n] = window.smartFungeConfig[n];
        }
    }
}

// save to localStorage
config.save = function() {
    // check if this option is allowed
    // so users can choose to run privately
    if (!config.object.saveLocally) {
        return;
    }
    
    // if localStorage doesnt exist
    // then we cant do this
    if (!window.localStorage) {
        console.warn('No local storage but config.saveLocally enabled');
        return;
    }

    // convert to string (or try)
    let string;
    try {
        string = JSON.stringify(config.object);
    } catch (e) {
        throw new Error('Could not convert config to JSON: ' + e.message);
    }

    // save
    window.localStorage.setItem('smartFungeConfig', string);
}

// load from localStorage
config.load = function() {    
    // if localStorage doesnt exist
    // then we cant do this
    if (!window.localStorage) {
        console.warn('No local storage but config.saveLocally enabled');
        return;
    }

    // convert to object
    let object;
    try {
        object = JSON.parse(window.localStorage.getItem('smartFungeConfig'));
    } catch (e) {
        throw new Error('Could not load config from local storage: ' + e.message);
    }
    
    // load
    Object.assign(config.object, object);
}

// save to app
require('./app.js').config = config;

// export as well
module.exports = config;