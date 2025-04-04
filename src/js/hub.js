// hub.js

class Hub {
    constructor() {
        this.events = {};
    }
    listen(obj) {
        if (!obj) return;

        // check inherited properties
        this.listen(Object.getPrototypeOf(obj))

        // check object's properties
        let names = Object.getOwnPropertyNames(obj);
        for (let i=0; i<names.length; i++) {
            const n = names[i];
            if (n.startsWith('on')) {
                this.addListener(n.substring(2), data => obj[n](data));
            }
        }
    }
    addListener(event, handler) {
        if (!this.events[event]) this.events[event] = new Set();
        this.events[event].add(handler);
    }
    removeListener(event, handler) {
        if (!this.events[event]) return;
        this.events[event].delete(handler);
    }
    dispatch(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(handler => {
            handler(data);
        })
    }
}