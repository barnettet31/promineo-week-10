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
    const container = document.createElement("li");
    container.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    const { id, toDoDescription, toDoName } = item;
    const construtor = `<div
             data-id="${id}"
              class="list-group-item w-100"
              >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${toDoName}</h5>
                <button data-delete="${id}" class="btn btn-danger">Delete</small>
              </div>
              <p class="mb-1">${toDoDescription}</p>
              
            </div>`;
    container.innerHTML = construtor;
    return container;
};
const handleUpdateToDos = (data, action, target) => {
    var _a, _b;
    switch (action) {
        case "add":
            target.appendChild(createElement(data));
            (_a = document.querySelector(`[data-delete="${data.id}"]`)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                myToDoList.removeToDoItem(data.id);
            });
            break;
        case "remove":
            (_b = document.querySelector(`[data-id="${data.id}"]`)) === null || _b === void 0 ? void 0 : _b.remove();
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
