class Joystick {
    constructor(selector, callback) {
        this.callback = callback
        this.element = document.querySelector(selector)
        this.parent = this.element.parentElement

        this.element.addEventListener('mousedown', this.onMouseDown.bind(this))
        document.addEventListener('mouseup', this.onMouseUp.bind(this))

        this.reset()
    }

    get boundary() {
        const rectangle = this.parent.getBoundingClientRect()
        return {
            x: rectangle.width - this.element.offsetWidth,
            y: rectangle.height - this.element.offsetHeight,
        }
    }

    reset() {
        this.active = false
        this.x = this.boundary.x / 2
        this.y = this.boundary.y / 2
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
    }

    onMouseDown() {
        this.active = true
        this.element.style.background = 'blue'
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseUp() {
        this.active = false
        this.element.style.background = 'green'
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(e) {
        if (!this.active) return

        const mouseX = e.clientX - this.parent.getBoundingClientRect().left
        const mouseY = e.clientY - this.parent.getBoundingClientRect().top

        this.x = Math.max(0, Math.min(mouseX - this.element.offsetWidth / 2, this.boundary.x))
        this.y = Math.max(0, Math.min(mouseY - this.element.offsetHeight / 2, this.boundary.y))

        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`

        this.callback?.({ x: this.x, y: this.y }, this.boundary)
    }
}


const getDefaultShadowState = () => ({
    offsetX: 0,
    offsetY: 0,
    shadowColor: '#ffffff',
    backgroundColor: '#ff0000',
    blurRadius: 20,
    spreadRadius: 0,
    inset: false,
})

let state = getDefaultShadowState()
const target = document.getElementById('target')
const joystick = new Joystick('#joystick', onJoystickMove)

function onJoystickMove({ x, y }, boundary) {
    state.offsetX = x - (boundary.x / 2)
    state.offsetY = y - (boundary.y / 2)
    renderBoxShadow()
}

function onInputChange(e) {
    if (e.target.id === 'inset') {
        state.inset = e.target.checked
    } else {
        state[e.target.id] = e.target.value
    }

    renderBoxShadow()
}

function renderBoxShadow() {
    target.style.boxShadow = `${state.inset ? 'inset' : ''} ${state.offsetX}px ${state.offsetY}px ${state.blurRadius}px ${state.spreadRadius}px ${state.shadowColor}`
    target.style.backgroundColor = state.backgroundColor
}

function reset() {
    joystick.reset()
    state = getDefaultShadowState()

    document.getElementById('shadowColor').value = state.shadowColor
    document.getElementById('backgroundColor').value = state.backgroundColor
    document.getElementById('blurRadius').value = state.blurRadius
    document.getElementById('spreadRadius').value = state.spreadRadius
    document.getElementById('inset').checked = state.inset
}

reset()
renderBoxShadow()
document.addEventListener('change', onInputChange)
