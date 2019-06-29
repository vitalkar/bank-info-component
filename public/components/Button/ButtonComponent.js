const currentDocument = document.currentScript.ownerDocument;

class ButtonComponent extends HTMLElement {

    constructor() {
        super();

    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#button-component-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
    }
}

customElements.define('button-component', ButtonComponent);