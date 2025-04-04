// gui.js

class GUI {
    constructor() {
        app.hub.listen(this);
    }
    onload() {
        GUI.byTag('title')[0].textContent = 'Smart Funge IDE';
        let icon = GUI.create('link');
        icon.rel = 'icon';
        icon.type = 'image/x-icon';
        icon.href = GUI.image('icon.png');
        document.head.appendChild(icon);
    }

    // DOM HELPERS

    static byId(id) {
        return document.getElementById(id);
    }
    static byClass(cls) {
        return Array.from(document.getElementsByClassName(cls))
    }
    static byTag(tag) {
        return Array.from(document.getElementsByTagName(tag))
    }
    static create(tag, ...classes) {
        let el = document.createElement(tag);
        for (let i=0; i<classes.length; i++) {
            el.classList.add(classes[i]);
        }
        return el;
    }

    // ASSET HELPERS

    static image(name) {
        return 'data:image/png;base64,' + assets[name];
    }
}