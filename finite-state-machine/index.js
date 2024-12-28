import { select } from '@inquirer/prompts'

const STATE = {
    idle: 'idle',
    waitingChoice: 'waitingChoice',
    waitingDeposit: 'waitingDeposit',
    dispensing: 'dispensing',
    returningChange: 'returningChange',
    cancel: 'cancel',
}

const STATE_TRANSITION = {
    [STATE.waitingChoice]: async (context) => {
        context.chosenItem = await select({
            message: 'Choose an item',
            choices: ITEMS.map((item) => ({ name: `${item.name} - ${item.price}$`, value: item })),
        })

        context.state = STATE.waitingDeposit

        return context
    },
    [STATE.waitingDeposit]: async (context) => {
        const answer = await select({
            message: 'Deposit money',
            choices: [
                { name: '1$', value: 1 },
                { name: '5$', value: 5 },
                { name: '10$', value: 10 },
                { name: 'Cancel', value: null },
            ],
        })

        if (answer === null) {
            context.state = context.deposit > 0 ? STATE.returningChange : STATE.cancel
        }

        context.deposit += answer
        if (context.deposit >= context.chosenItem.price) {
            context.state = STATE.dispensing
        }

        return context
    },
    [STATE.dispensing]: async (context) => {
        console.log(`Dispensing ${context.chosenItem.name}. Enjoy!`)

        if (context.deposit > context.chosenItem.price) {
            context.state = STATE.returningChange
            return context
        }

        return context.rest()
    },
    [STATE.returningChange]: async (context) => {
        console.log(`Your change: ${context.deposit - context.chosenItem.price}`)
        return context.rest()
    },
    [STATE.cancel]: async (context) => {
        console.log('Canceled!')
        return context.rest()
    },
}

const ITEMS = [
    { name: 'Coke', price: 1.25 },
    { name: 'Pepsi', price: 1.5 },
    { name: 'Sprite', price: 1.75 },
    { name: 'Dr. Pepper', price: 2.0 },
]

class Context {
    constructor() {
        this.rest()
    }

    rest() {
        this.state = STATE.idle
        this.chosenItem = null
        this.deposit = 0
        return this
    }
}

class VendingMachine {
    constructor() {
        this.context = new Context()
    }

    async run() {
        this.context.state = STATE.waitingChoice

        do {
            this.context = await STATE_TRANSITION[this.context.state](this.context)
        } while (this.context.state !== STATE.idle)
    }
}

const vendingMachine = new VendingMachine()
vendingMachine.run()
