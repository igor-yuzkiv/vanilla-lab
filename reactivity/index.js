function reactive(initialValue, selector) {
    const el = document.querySelector(selector)
    return new Proxy(
        { value: initialValue },
        {
            get(target, prop) {
                console.log('get', { target, prop })
                return target[prop]
            },
            set(target, prop, value) {
                el.innerHTML = value
                target[prop] = value
            },
        }
    )
}

const count = reactive(0, '.container h1')

function onClickMinus() {}

function onClickPlus() {}

document.addEventListener('click', (e) => {
    const actions = {
        btn_add: onClickPlus,
        btn_minus: onClickMinus,
    }

    e.target
})

// document.getElementById('btn-doSome').addEventListener('click', () => {
//     count.value++
// })
