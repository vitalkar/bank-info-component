const currentDocument = document.currentScript.ownerDocument;

class InputComponent extends HTMLElement {

    constructor() {
        super();
        
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#input-component-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
    }
}

customElements.define('input-component', InputComponent);