const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();
eventListeners();
function eventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', removeItem);
    btnDeleteAll.addEventListener('click', removeAllItem);
}
function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    })
}
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemToLs(text) {
    items = getItemsFromLS();
    items.push(text)
    localStorage.setItem('items', JSON.stringify(items));
}
function deleteItemFromLs(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1)
        }
    })
    localStorage.setItem('items', JSON.stringify(items))
}
function createItem(textOne) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    const text = document.createTextNode(textOne);
    li.appendChild(text)
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.className = 'delete-item float-right';
    a.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(a)
    taskList.appendChild(li);
}
function addNewItem(e) {
    if (input.value === "") {
        alert('Add New Item')
    }
    else {
        createItem(input.value)
        setItemToLs(input.value);
        input.value = '';
    }
    e.preventDefault();
}
function removeItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure you want to delete each item?')) {
            e.target.parentElement.parentElement.remove()
            deleteItemFromLs(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}
function removeAllItem() {
    if (confirm('Are you sure you want to delete all items?')) {
        taskList.innerHTML = '';
    }
    localStorage.clear();   
}