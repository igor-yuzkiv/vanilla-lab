import { Joystick } from './joystick.js'

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

function onJoystickMove(position, boundary) {
    state.offsetX = position.x - boundary.x / 2
    state.offsetY = position.y - boundary.y / 2
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

    renderBoxShadow()
}

reset()
document.addEventListener('change', onInputChange)
