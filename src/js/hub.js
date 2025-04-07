/* hub.js
 * for Smart Funge IDE
 * 
 * version 1.0.0
 * by Maza
 */

/**
 * represents a hub (object that has events)
 */
class Hub {
    /**
     * creates a new Hub
     */
    constructor() {
        this.events = {};
    }
    
    /**
     * shortcut to listen to events.
     * for each method in the object (and its prototype)
     * that starts with 'on' an event is added
     * @param obj {object} object to search
     */
    listen(obj) {
        if (!obj) return;

        /* add listeners for inherited methods first */
        this.listen(Object.getPrototypeOf(obj))

        /* add listeners for the object's methods */
        let names = Object.getOwnPropertyNames(obj);
        for (let i=0; i<names.length; i++) {
            const n = names[i];
            if (n.startsWith('on')) {
                this.addListener(n.substring(2), data => obj[n](data));
            }
        }
    }
    
    /**
     * adds an event listener
     * @param event {string} the event name
     * @param handler {function} the event handler to add
     */
    addListener(event, handler) {
        if (!this.events[event]) this.events[event] = new Set();
        this.events[event].add(handler);
    }
    
    /**
     * removes an event listener
     * @param event {string} the event name
     * @param handler {function} the event handler to remove
     */
    removeListener(event, handler) {
        if (!this.events[event]) return;
        this.events[event].delete(handler);
    }
    
    /**
     * activates an event and calls all handlers
     * asyncronously
     * @param event {string} the event to activate
     * @param data {any} the data to pass to the handlers
     */
    dispatch(event, data) {
        if (!this.events[event]) return;
        setInterval(() => this.events[event].forEach(handler => {
            handler(data);
        }), 0);
    }
}
