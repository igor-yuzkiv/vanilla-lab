export class Joystick {
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
        document.addEventListener('mousemove', this.onMouseMove.bind(this))
    }

    onMouseUp() {
        this.active = false
        this.element.style.background = 'green'
        document.removeEventListener('mousemove', this.onMouseMove.bind(this))
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
