class CustomCounter extends HTMLElement {
    static get observedAttributes() {
        return ['color']
    }

    constructor() {
        super()

        this.handleClick = this.handleClick.bind(this)
        this.value = +this.getAttribute('initial') || 0
    }

    get textColor() {
        return this.getAttribute('color') || 'white'
    }

    set textColor(value) {
        this.setAttribute('color', value)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = this.render()
        this.shadowRoot.addEventListener('click', this.handleClick)
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener('click', this.handleClick)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color' && oldValue !== newValue) {
            this.style.setProperty('--text-color', newValue || 'white')
        }
    }

    render() {
        this.style.setProperty('--text-color', this.textColor)

        return `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                .counter {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                    
                    & strong {
                        color: var(--text-color);
                    }
                }
            </style>
            
            <div class="counter">
                <button type="button" data-action="decrease">-</button>
                <strong>${this.value}</strong>
                <button type="button" data-action="increase">+</button>
            </div>
            <slot name="description"></slot>
        `
    }

    handleClick(event) {
        const { action } = event.target.dataset
        if (action === 'increase') {
            this.value++
        } else if (action === 'decrease') {
            this.value--
        }

        this.shadowRoot.querySelector('strong').textContent = this.value
        this.emitEvent()
    }

    emitEvent() {
        this.dispatchEvent(new CustomEvent('counterChange', { detail: this.value }))
    }
}

customElements.define('custom-counter', CustomCounter)
