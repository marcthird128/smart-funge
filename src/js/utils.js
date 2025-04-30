/* Smart Funge befunge IDE version 0.0.1
 * Utilities
 */

// get the app
const app = require('./app.js');

// format time
function formatTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// debug message, only shows in debug mode
function debug(message = '') {
    if (app.config.object.debugMode) {
        console.log(`[${formatTime()} DEBUG] %c${message}`, 'color: purple;');
    }
}

// log
function log(message = '') {
    console.log(`[${formatTime()} LOG] %c${message}`, 'color: blue;');
}

// warn
function warn(message = '') {
    console.log(`[${formatTime()} WARN] %c${message}`, 'color: orange;');
}

// error
function error(message = '') {
    console.log(`[${formatTime()} ERROR] %c${message}`, 'color: red;');
}

// severe error that stops current function
function severe(message = '') {
    console.log(`[${formatTime()} SEVERE] %c${message}`, 'color: darkred;');
    throw new Error('A severe error occurred: ' + message);
}

// put it in app
app.utils = {
    formatTime, debug, log, warn, error, severe
}

// export too
module.exports = app.utils;