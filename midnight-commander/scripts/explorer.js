export class Explorer {
    constructor(items, index) {
        this.items = items
        this.index = index
        this.currentFolderId = null
        this.active = false

        this.create()
    }

    create() {
        this.panelEl = document.createElement('div')
        this.panelEl.classList.add('panel')
        this.panelEl.tabIndex = this.index
        this.panelEl.setAttribute('data-breadcrumb', '< ~/Documents')

        this.explorerEl = document.querySelector('#templates .panel-explorer').cloneNode(true)
        this.panelEl.append(this.explorerEl)

        document.querySelector('.container').appendChild(this.panelEl)

        this.render()
    }

    render() {
        this.explorerEl.querySelector('tbody').innerHTML = this.items
            .filter(({ parent_id }) => this.currentFolderId === parent_id)
            .map((i) => this.renderItem(i))
            .join('')
    }

    renderItem(item) {
        return `<tr data-key="${item.id}"><td>${item.name}</td><td>${item.size}</td><td>${item.modified_at}</td></tr>`
    }
}
