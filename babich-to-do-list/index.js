const defaultTodoFormValue = () => ({
    id: null,
    category: null,
    subject: '',
    notes: '',
    is_completed: false,
})

const listState = [
    { id: 1, category: 'Sport', subject: 'test', notes: 'Test Notes' },
]

const searchFormEl = document.querySelector('.search-form')
const listContainerEl = document.querySelector('.todo-list')
const listItemTemplateEl = document.querySelector('#template .list-item')

function doSearch(e) {
    e.preventDefault()
    const query = searchFormEl.querySelector('input[name="search-query"]')?.value
    console.log('doSearch', query)
}

function renderTag(value) {
    const tagEl = document.createElement('p');
    tagEl.innerText = value;
    tagEl.classList.add('tag');
    return tagEl;
}

function doRenderList() {
    listContainerEl.innerHTML = ''

    for (const item of listState) {
        const listItemEl = listItemTemplateEl.cloneNode(true)

        listItemEl.dataset.id = item.id
        listItemEl.querySelector('.content .subject').innerText = item.subject;
        listItemEl.querySelector('.content .notes').innerText = item.notes;
        listItemEl.querySelector('.tags').appendChild(renderTag(item.category))

        listContainerEl.appendChild(listItemEl)
    }
}


function onClickEdit() {
    console.log('onClickEdit')
}

function onClickDelete() {
    console.log('onClickDelete')
}

function onClickComplete() {
    console.log('onClickComplete')
}


function main() {
    doRenderList()

    document.addEventListener('click', (e) => {
        console.log('click', e.target.dataset)
        const handlers = {
            editTodo: onClickEdit,
            deleteTodo: onClickDelete,
            completeTodo: onClickComplete,
        }

        if (handlers[e.target.dataset?.action]) {
            handlers[e.target.dataset.action]()
        }
    })

    searchFormEl.addEventListener('submit', doSearch)
}

main()