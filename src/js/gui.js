/* gui.js
 * for Smart Funge IDE
 * 
 * version 1.0.0
 * by Maza 
 */

/**
 * represents the graphical user interface
 */
class GUI {
    /**
     * creates a new GUI
     */
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
        
        // add backdrop
        app.backdrop = GUI.create('div', 'gui-backdrop', 'hidden');
        app.backdrop.addEventListener('click', () => app.hub.dispatch('menuclose'));
        app.hub.addListener('menuopen', () => app.backdrop.classList.remove('hidden'));
        app.hub.addListener('menuclose', () => app.backdrop.classList.add('hidden'));
        GUI.addToBody(app.backdrop);
    }

    /**
     * gets an element by its ID
     * @param id {string} the element's id
     * @returns {HTMLElement}
     */
    static byId(id) {
        return document.getElementById(id);
    }
    
    /**
     * gets an array of elements who have a class
     * @param cls {string} class to search for
     * @returns {Array<HTMLElement>}
     */
    static byClass(cls) {
        return Array.from(document.getElementsByClassName(cls))
    }
    
    /**
     * gets an array of elements who have a tag
     * @param tag {string} tag to search for
     * @returns {Array<HTMLElement>}
     */
    static byTag(tag) {
        return Array.from(document.getElementsByTagName(tag))
    }
    
    /**
     * creates an HTML element
     * @param tag {string} element's tag
     * @param ...classes {string} classes to give the element
     * @returns {HTMLElement}
     */
    static create(tag, ...classes) {
        let el = document.createElement(tag);
        for (let i=0; i<classes.length; i++) {
            el.classList.add(classes[i]);
        }
        return el;
    }
    
    /**
     * adds an element to the head
     * @param el {HTMLElement} element to add
     */
    static addToHead(el) {
        document.head.appendChild(el);
    }
    
    /** 
     * adds an element to the body
     * @param el {HTMLElement} element to add
     */
    static addToBody(el) {
        document.body.appendChild(el);
    }
    
    /**
     * adds an element to another element
     * @param parent {HTMLElement} the element to add to
     * @param child {HTMLElement} the element to add
     */
    static add(parent, child) {
        parent.appendChild(child);
    }
    
    /** 
     * removes an element from another element
     * @param parent {HTMLElement} the parent of the element
     * @param child {HTMLElement} the element to remove from parent
     */
    static remove(parent, child) {
        parent.removeChild(child);
    }

    /**
     * creates an image URL from the compiled assets
     * @param name {string} the name of the asset file
     */
    static image(name) {
        return 'data:image/png;base64,' + app.assets[name];
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// GENERAL CLASSES ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * represents a gui element of any type
 */
class GUIElement {
    /**
     * creates a new GUIElement
     */
    constructor() {
        app.hub.listen(this);
        
        /* set of children */
        this.children = new Set();
    }
    
    /**
     * returns the parent
     * @returns {GUIElement?}
     */
    getParent() {
        return this.parent;
    }
    
    /**
     * sets the parent
     * @param parent {GUIElement?} new parent
     */
    setParent(parent) {
        if (this.parent) parent.removeChild(this);
        this.parent = parent;
        if (this.parent) parent.addChild(this);
    }
    
    /**
     * adds a child to this element
     * @param child {GUIElement} child to add
     */
    addChild(child) {
        this.children.add(child);
        GUI.add(this.el, child.el);
    }
    
    /**
     * removes a child from this element
     * @param child {GUIElement} child to remove
     */
    removeChild(child) {
        this.children.delete(child);
        GUI.remove(this.el, child.el);
    }
}

/**
 * represents an image
 */
class GUIImage extends GUIElement {
    /**
     * creates a new GUIImage
     * @param src {string} URL of the image
     * @param parent {GUIElement?} optional parent element
     */
    constructor(src, parent) {
        super();

        this.el = GUI.create('img', 'gui-image');
        this.setParent(parent);
        this.el.src = src;
        this.el.draggable = false;
    }
}

/**
 * a text element
 */
class GUIText extends GUIElement {
    /**
     * creates a new GUIText
     * @param text {string} the text content
     * @param parent {GUIElement?} optional parent element
     */
    constructor(text, parent) {
        super();
        
        this.el = GUI.create('span', 'gui-text');
        this.setParent(parent);
        
        this.setText(text);
    }
    
    /**
     * gets the text content
     * @returns {string}
     */
    getText() {
        return this.text;
    }
    
    /**
     * sets the text content
     * @param text {string} new text content
     */
    setText(text) {
        this.text = text;
        this.el.textContent = text;
    }
}
    

/**
 * generic menu item class for
 * any button type inside a menu
 */
class GUIMenuItem extends GUIElement {
    /**
     * creates a new GUIMenuItem
     * @param text {string} text content
     * @param parent {GUIElement?} optional parent element
     */
    constructor(text, parent) {
        super();
        
        this.el = GUI.create('div', 'gui-menu-item');
        this.setParent(parent);
        
        this.textEl = new GUIText(text, this);
        
        this.setText(text);
    }
    
    /**
     * gets the text content
     * @returns {string}
     */
    getText() {
        return this.text;
    }
    
    /**
     * sets the text content
     * @param text {string} new text content
     */
    setText(text) {
        this.text = text;
        this.textEl.setText(text);
    }
}

/**
 * the dropdown when you activate a menu tab
 */
class GUIMenuTabDropdown extends GUIElement {
    /**
     * creates a new GUIMenuTabDropdown
     * @param parent {GUIElement?} optional parent element
     */
    constructor(parent) {
        super();
        
        this.el = GUI.create('div', 'gui-menu-tab-dropdown', 'hidden');
        this.setParent(parent);
        
        app.hub.addListener('menuclose', () => this.hide());
        
        this.hidden = true;
    }
    
    /**
     * hides the dropdown
     */
    hide() {
        this.el.classList.add('hidden');
        this.hidden = true;
    }
    
    /**
     * shows the dropdown
     */
    show() {
        this.el.classList.remove('hidden');
        this.hidden = false;
    }
    
    /**
     * toggles dropdown state
     */
    toggle() {
        if (this.hidden) this.show()
        else this.hide();
    }
}

/**
 * a menu tab (menu button that has child items)
 */
class GUIMenuTab extends GUIElement {
    /**
     * creates a new GUIMenuTab
     * @param text {string} text content
     * @param parent {GUIElement?} optional parent element
     */
    constructor(text, parent) {
        super();
        
        this.el = GUI.create('div', 'gui-menu-item', 'gui-menu-tab');
        this.setParent(parent);
        
        this.tabs = new Set();
        
        this.dropdown = new GUIMenuTabDropdown(this);
        
        this.button = new GUIMenuButton(text, '_');
        super.addChild(this.button);
        
        this.button.el.addEventListener('click', () => this.activate());
    }
    
    /**
     * adds a child
     * @param child {GUIElement} child to add
     */
    addChild(child) {        
        if (child instanceof GUIMenuItem) {
             if (child instanceof GUIMenuTab) this.tabs.add(child);
             this.dropdown.addChild(child);
        } else {
            super.addChild(child);
        }
    }
    
    /**
     * removes a child
     * @param child {GUIElement} child to remove
     */
    removeChild(child) {
        if (child instanceof GUIMenuItem) {
            if (child instanceof GUIMenuTab) this.tabs.remove(child);
            this.dropdown.removeChild(child);
        } else {
            super.removeChild(child);
        }
    }
    
    /**
     * activate this menu tab
     */
    activate() {
        this.dropdown.toggle();
        app.hub.dispatch(this.dropdown.hidden ? 'menuclose' : 'menuopen');
    }
}

/**
 * a menu button
 */
class GUIMenuButton extends GUIMenuItem {
    /**
     * creates a GUIMenuButton
     * @param text {string} the text conten
     * @param command {string} the command to fire when activated
     * @param parent {GUIElement?} optional parent element
     */
    constructor(text, command, parent) {
        super(text, parent);
        
        this.el.classList.add('gui-menu-button');
        this.el.addEventListener('click', () => this.activate());

        this.setCommand(command);
    }
    
    /**
     * gets the command
     * @returns {string}
     */
    getCommand() {
        return this.command;
    }
    
    /**
     * sets the command
     * @param cmd {string} new command
     */
    setCommand(cmd) {
        this.command = cmd;
    }
    
    /**
     * activates this menu item
     */
    activate() {
        app.hub.dispatch('command', this.command);
        app.hub.dispatch('menuclose');
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// SPECIFIC CLASSES //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * wrapper element for the gui
 */
class GUIWrapper extends GUIElement {
    /**
     * creates a new GUIWrapper
     */
    constructor() {
        super();

        this.el = GUI.create('div', 'gui-wrapper');
        GUI.addToBody(this.el);
        
        this.header = new GUIHeader(this);
        this.content = new GUIContent(this);
    }
}

/**
 * header element
 */
class GUIHeader extends GUIElement {
    /**
     * creates a new GUIHeader
     */
    constructor(parent) {
        super();

        this.el = GUI.create('div', 'gui-header');
        this.setParent(parent);

        this.icon = new GUIImage(GUI.image('icon.png'), this);
        this.icon.el.classList.add('gui-header-icon');

        this.menuBar = new GUIMenuBar(this);
    }
}

/**
 * menu bar on top of the screen
 */
class GUIMenuBar extends GUIElement {
    /**
     * creates a new GUIMenuBar
     */
    constructor(parent) {
        super();
        
        this.el = GUI.create('div', 'gui-menu-bar');
        this.setParent(parent);

        this.fileTab = new GUIMenuTab('File', this);
        new GUIMenuButton('New...', 'new', this.fileTab);
        new GUIMenuButton('Open Recent...', 'recent-dialog', this.fileTab);
        
        this.editTab = new GUIMenuButton('Edit', 'exit', this);
    }
}

/**
 * content for the main stuff
 */
class GUIContent extends GUIElement {
    /**
     * creates a new GUIContent
     */
    constructor(parent) {
        super();

        this.el = GUI.create('div', 'gui-content');
        this.setParent(parent);
        this.el.textContent = 'content';
    }
}
