const target = document.getElementById('target')
const joystick = target.firstElementChild
const shadowColorInput = document.getElementById('shadowColor')
const backgroundColorInput = document.getElementById('backgroundColor')
const blurRadiusInput = document.getElementById('blurRadius')
const spreadRadiusInput = document.getElementById('spreadRadius')
const insetCheckbox = document.getElementById('inset')

const rectangle = target.getBoundingClientRect()
const boundary = {
    x: rectangle.width - joystick.offsetWidth,
    y: rectangle.height - joystick.offsetHeight,
}

const getDefaultJoystickState = () => ({
    active: false,
    x: boundary.x / 2,
    y: boundary.y / 2,
})

const getDefaultShadowState = () => ({
    offsetX: 0,
    offsetY: 0,
    blurRadius: 20,
    spreadRadius: 0,
    color: '#ffffff',
    backgroundColor: '#ff0000',
    inset: false,
})

let joystickState = getDefaultJoystickState()
let shadowState = getDefaultShadowState()

function onJoystickClick(event) {
    const isActive = event?.type === 'mousedown'
    joystickState.active = isActive
    joystick.style.background = isActive ? 'blue' : 'green'
}

function onTargetMouseMove(event) {
    if (!joystickState.active) return

    const mouseX = event.clientX - rectangle.left
    const mouseY = event.clientY - rectangle.top

    joystickState.x = Math.max(0, Math.min(mouseX - joystick.offsetWidth / 2, boundary.x))
    joystickState.y = Math.max(0, Math.min(mouseY - joystick.offsetHeight / 2, boundary.y))

    joystick.style.left = `${joystickState.x}px`
    joystick.style.top = `${joystickState.y}px`

    renderBoxShadow()
}

function renderBoxShadow() {
    shadowState.offsetX = joystickState.x - (boundary.x / 2)
    shadowState.offsetY = joystickState.y - (boundary.y / 2)

    target.style.boxShadow = `${shadowState.inset ? 'inset' : ''} ${shadowState.offsetX}px ${shadowState.offsetY}px ${shadowState.blurRadius}px ${shadowState.spreadRadius}px ${shadowState.color}`
    target.style.backgroundColor = shadowState.backgroundColor
}

function reset() {
    joystickState = getDefaultJoystickState()
    shadowState = getDefaultShadowState()
    renderBoxShadow()

    joystick.style.left = `${joystickState.x}px`
    joystick.style.top = `${joystickState.y}px`

    shadowColorInput.value = shadowState.color
    backgroundColorInput.value = shadowState.backgroundColor
    blurRadiusInput.value = shadowState.blurRadius
    spreadRadiusInput.value = shadowState.spreadRadius
}

function onChangeShadowColor(e) {
    shadowState.color = e.target.value
    renderBoxShadow()
}

function onChangeBackgroundColor(e) {
    shadowState.backgroundColor = e.target.value
    renderBoxShadow()
}

function onChangeBlurRadius(e) {
    shadowState.blurRadius = e.target.value
    renderBoxShadow()
}

function onChangeSpreadRadius(e) {
    shadowState.spreadRadius = e.target.value
    renderBoxShadow()
}

function onChangeInset(e) {
    shadowState.inset = e.target.checked
    renderBoxShadow()
}

reset()

joystick.addEventListener('mousedown', onJoystickClick)
document.addEventListener('mouseup', onJoystickClick)
target.addEventListener('mousemove', onTargetMouseMove)
shadowColorInput.addEventListener('change', onChangeShadowColor)
backgroundColorInput.addEventListener('change', onChangeBackgroundColor)
blurRadiusInput.addEventListener('change', onChangeBlurRadius)
spreadRadiusInput.addEventListener('change', onChangeSpreadRadius)
insetCheckbox.addEventListener('change', onChangeInset)
