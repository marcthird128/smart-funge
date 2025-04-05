// gui.js

class GUI {
    constructor() {
        app.hub.listen(this);

        this.wrapper = new GUIWrapper();

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
    static add(parent, child) {
        parent.appendChild(child);
    }
    static remove(parent, child) {
        parent.removeChild(child);
    }

    // ASSET HELPERS

    static image(name) {
        return 'data:image/png;base64,' + app.assets[name];
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERAL CLASSES
///////////////////////////////////////////////////////////////////////////////////////////////////////

// top level element class
class GUIElement {
    constructor() {
        app.hub.listen(this);
    }
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        if (this.parent) GUI.remove(this.parent.el, this.el);
        this.parent = parent;
        if (this.parent) GUI.add(this.parent.el, this.el);
    }
}

class GUIMenuTab extends GUIElement {
    constructor(parent) {
        super();
        
        this.el = GUI.create('div', 'gui-menu-tab');
        this.setParent(parent);

        this.tabs = new Set();
    }
    addItem(item) {
        this.tabs.add(item);
        item.setParent(this);
    }
    removeItem(tab) {
        this.tabs.delete(item);
        item.setParent();
    }
}

class GUIMenuItem extends GUIElement {
    constructor(text, command) {
        super();

        this.el = GUI.create('div', 'gui-menu-item');
        this.el.addEventListener('click', () => this.activate());

        this.setText(text);
        this.setCommand(command);
    }
    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
        this.el.textContent = text;
    }
    getCommand() {
        return this.command;
    }
    setCommand(cmd) {
        this.command = cmd;
    }
    activate() {
        app.hub.dispatch('command', this.command);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// SPECIFIC CLASSES
///////////////////////////////////////////////////////////////////////////////////////////////////////

class GUIWrapper extends GUIElement {
    constructor() {
        super();

        this.el = GUI.create('div', 'gui-wrapper');
        GUI.addToBody(this.el);
        
        this.header = new GUIHeader(this);
        this.content = new GUIContent(this);
    }
}

class GUIHeader extends GUIElement {
    constructor(parent) {
        super();

        this.el = GUI.create('div', 'gui-header');
        this.setParent(parent);

        this.icon = GUI.create('img', 'gui-header-icon');
        this.icon.src = GUI.image('icon.png');
        GUI.add(this.el, this.icon);

        this.menuBar = new GUIMenuBar(this);
    }
}

class GUIMenuBar extends GUIMenuTab {
    constructor(parent) {
        super(parent);
        
        this.el.classList.add('gui-menu-bar');

        this.addItem(new GUIMenuItem('Exit', 'exit'));
    }
}

class GUIContent extends GUIElement {
    constructor(parent) {
        super();

        this.el = GUI.create('div', 'gui-content');
        this.el.textContent = 'content';
        this.setParent(parent);
    }
}