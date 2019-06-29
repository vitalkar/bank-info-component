const currentDocument = document.currentScript.ownerDocument;

class BankComponent extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', (e) => {
        
        })
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#bank-component-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
    }


    
}
customElements.define('bank-component', BankComponent);