import { createReactive, watch } from './index.js'

const counter = createReactive(0)
const second = createReactive(0)

watch(counter, (oldValue, newValue) => console.log('counter is changed', { oldValue, newValue }))
watch(second, (oldValue, newValue) => console.log('second is changed', { oldValue, newValue }))

setTimeout(() => {
    counter.value = 1
    second.value = 1
}, 500)

setTimeout(() => {
    counter.value = 2
    second.value = 2
}, 1000)
