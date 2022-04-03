const template = document.createElement('template');

template.innerHTML = `
      <input className="form-control" list="datalist"
        id="dataListInput"
        placeholder="Type to search..." />
      <datalist id="datalist">
      </datalist>
`

class AutoCompleteWebComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ 'mode': 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.mainInput = this.shadowRoot.querySelector('#dataListInput');
        this.datalist = this.shadowRoot.querySelector('#datalist');
    }

    static get observedAttributes() {
        return ["options"];
    }

    connectedCallback() {
        this.mainInput
            .addEventListener('input', (event) => this.onInputChangedHandler(event));

        this.mainInput
            .addEventListener('focusout', (event) => this.onFocusLostHandler(event));
    }

    onInputChangedHandler(event) {
        event = new CustomEvent('onTextChanged', { detail: this.mainInput.value });
        this.dispatchEvent(event);
    }

    onFocusLostHandler(event) {
        event = new CustomEvent('onFocusOut', { detail: this.mainInput.value });
        this.dispatchEvent(event);
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName == 'options') {
            const options = JSON.parse(newValue);
            if (Array.isArray(options)) {
                this.datalist.innerHTML = '';

                options.forEach(option => {
                    var newOption = document.createElement('option');
                    newOption.value = option;
                    this.datalist
                        .appendChild(newOption);
                });
            }
        }
    }
}

window.customElements.define('auto-complete-wc', AutoCompleteWebComponent);