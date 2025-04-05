// client.js

// global app object
const app = {};
app.assets = assets; // get assets

window.addEventListener('load', function() {
    app.hub = new Hub();
    
    app.gui = new GUI();

    // run after app initialized
    this.setTimeout(() => app.hub.dispatch('load'), 0);
});