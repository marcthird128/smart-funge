/* gui.js
 * for Smart Funge IDE
 * 
 * version 1.0.0
 * by Maza
 */

/* global app object */
const app = {};
app.assets = assets; /* get assets */

/* runs when page loads */
window.addEventListener('load', function() {
    app.hub = new Hub();
    
    app.gui = new GUI();

    /* this event will be run
     * after the app is initialized
     * because of changes to hub.js */
    app.hub.dispatch('load');
});
