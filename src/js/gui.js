// gui.js

class GUI {
    constructor() {
        app.hub.listen(this);
    }
    onload() {
        // set title
        GUI.byTag('title')[0].textContent = 'Smart Funge IDE';

        // add icon
        let icon = GUI.create('link');
        icon.rel = 'icon';
        icon.type = 'image/x-icon';
        icon.href = GUI.image('icon.png');
        GUI.addToHead(icon);

        // add stylesheet
        let style = GUI.create('style');
        style.textContent = atob(app.assets['style.css'])
        GUI.addToHead(style);

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
    static addToHead(el) {
        document.head.appendChild(el);
    }
    static addToBody(el) {
        document.body.appendChild(el);
    }

    // ASSET HELPERS

    static image(name) {
        return 'data:image/png;base64,' + app.assets[name];
    }
}