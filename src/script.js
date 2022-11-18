"use strict";
const myForm = document.querySelector('#toDoForm'); // HTMLFormElement
const myTableContainer = document.querySelector('#toDoContainer');
class ToDoList {
    constructor(tableElement, callback, initialToDos = '') {
        this.toDoList = [];
        if (initialToDos.length > 0 && typeof initialToDos != 'string') {
            this.toDoList = [...initialToDos];
        }
        else {
            this.toDoList = [];
        }
        this.container = tableElement;
        this.callback = callback;
    }
    addToDoItem(toDoItem) {
        this.toDoList.push(toDoItem);
        this.callback(toDoItem, "add", this.container);
    }
    removeToDoItem(id) {
        const index = this.toDoList.findIndex((element) => element.id === id, 0);
        if (index > -1) {
            this.callback(this.toDoList[index], "remove", this.container);
            this.toDoList.splice(index, 1);
        }
    }
}
const createElement = function (item) {
    const row = document.createElement("tr");
    const { id, toDoDescription, toDoName } = item;
    row.classList.add("row");
    row.setAttribute("data-id", id);
    let td1 = document.createElement("td");
    td1.textContent = toDoName;
    td1.classList.add('col');
    row.appendChild(td1);
    let td2 = document.createElement("td");
    td2.classList.add('col');
    td2.textContent = toDoDescription;
    let deleteTd = document.createElement("td");
    deleteTd.classList.add('col');
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = 'Delete This';
    deleteButton.addEventListener("click", () => {
        myToDoList.removeToDoItem(id);
    });
    deleteTd.appendChild(deleteButton);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(deleteTd);
    return row;
};
const handleUpdateToDos = (data, action, target) => {
    var _a;
    switch (action) {
        case "add":
            target.appendChild(createElement(data));
            break;
        case "remove":
            (_a = document.querySelector(`[data-id=${data.id}]`)) === null || _a === void 0 ? void 0 : _a.remove();
            break;
        default:
            return;
    }
};
const myToDoList = new ToDoList(myTableContainer, handleUpdateToDos);
myForm === null || myForm === void 0 ? void 0 : myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const myFormData = new FormData(myForm);
    const myFormDataObject = Object.fromEntries(myFormData);
    const objectToAdd = {
        toDoName: myFormDataObject.toDoName,
        toDoDescription: myFormDataObject.toDoDescription,
        id: Date.now().toString(36) + Math.random().toString(36).substring(2)
    };
    myToDoList.addToDoItem(objectToAdd);
    myForm.reset();
});
