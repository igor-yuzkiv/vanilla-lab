let activeEffect

class Dep {
    subscriptions = new Set()

    track() {
        if (activeEffect && !this.subscriptions.has(activeEffect)) {
            this.subscriptions.add(activeEffect)
        }
    }

    notify(oldValue, newValue) {
        if (this.subscriptions.size > 0) {
            this.subscriptions.forEach((s) => s(newValue, oldValue))
        }
    }
}

class Reactive {
    _oldValue = undefined
    _value = undefined
    _dep = undefined

    constructor(value) {
        this._value = value
        this._dep = new Dep()
    }

    get value() {
        this._dep.track()
        return this._value
    }

    set value(newValue) {
        this._oldValue = this._value
        this._value = newValue

        this._dep.notify(this._value, this._oldValue)
    }
}

function createReactive(value) {
    return new Reactive(value)
}

function watch(source, cb) {
    activeEffect = cb
    source.value
    activeEffect = null
}

export { Dep, Reactive, createReactive, watch }
