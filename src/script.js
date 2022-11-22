"use strict";
const myForm = document.querySelector("#toDoForm"); // HTMLFormElement
const myTableContainer = document.querySelector("#toDoContainer");
class ToDoItem {
    constructor(id, name, description, parentEl, parentRef) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.parentEl = parentEl;
        this.parentClassRef = parentRef;
    }
    render() {
        const { newHtml, ref } = this.generateHTML();
        if (ref) {
            this.parentEl.replaceChild(newHtml, ref);
            return this.addEventListeners();
        }
        this.parentEl.appendChild(newHtml);
        this.addEventListeners();
    }
    update(name, description) {
        this.name = name;
        this.description = description;
        this.render();
        this.parentClassRef.updateLocalStorage();
    }
    generateHTML() {
        const ref = document.querySelector(`#${this.id}`);
        const newDiv = document.createElement('div');
        newDiv.classList.add('card', 'p-4', 'mt-3');
        newDiv.id = this.id;
        const innerHtmlString = `
              <ul class="nav nav-pills d-flex justify-content-between">
                <div class="d-flex">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-bs-toggle="pill"
                      href="#todo-${this.id}"
                      >ToDo</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="pill" href="#edit-${this.id}"
                      >Update</a
                    >
                  </li>
                </div>
                <button id="delete-${this.id}" class="btn btn-danger">Delete</button>
              </ul>
              <div class="tab-content">
                <div class="tab-pane mt-4 active" id="todo-${this.id}">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${this.name}</h5>
                      <p class="card-text">${this.description}</p>
                    </div>
                  </div>
                </div>
                <div class="tab-pane container fade" id="edit-${this.id}">
                  <form class="card container mt-4 py-4" id="update-${this.id}">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label"
                        >To Do</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        name="name" value="${this.name}" />
                    </div>
                    <div class="mb-3">
                      <label
                        for=""
                        class="form-label"
                        ></label
                      >
                      <textarea
                        class="form-control"
                        name="description"
                        rows="3">${this.description}</textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            `;
        newDiv.innerHTML = innerHtmlString;
        return {
            newHtml: newDiv,
            ref: ref,
        };
    }
    addEventListeners() {
        const deleteButton = document.querySelector(`#delete-${this.id}`);
        console.log(deleteButton);
        const updateForm = document.querySelector(`#update-${this.id}`);
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', () => {
            myToDoList.removeToDoItem(this.id);
        });
        updateForm === null || updateForm === void 0 ? void 0 : updateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const myForm = e.target;
            const { name, description } = Object.fromEntries(new FormData(myForm));
            ;
            this.update(name, description);
        });
    }
}
class ToDoList {
    constructor(container, defaultValues = []) {
        this.container = container;
        this.toDoList = defaultValues.map((todo) => {
            return new ToDoItem(todo.id, todo.toDoName, todo.toDoDescription, myTableContainer, this);
        });
    }
    addToDoItem(toDoItem) {
        const newTodo = new ToDoItem(toDoItem.id, toDoItem.toDoName, toDoItem.toDoDescription, this.container, this);
        this.toDoList.push(newTodo);
        this.updateLocalStorage();
        this.render();
    }
    removeToDoItem(id) {
        const removeThis = document.querySelector(`#${id}`);
        removeThis === null || removeThis === void 0 ? void 0 : removeThis.remove();
        const newTodos = this.toDoList.filter((todo) => todo.id != id);
        this.toDoList = newTodos;
        this.updateLocalStorage();
    }
    updateLocalStorage() {
        console.log(this.toDoList);
        const jsonString = this.toDoList.map(({ id, name, description }) => {
            return { id, toDoName: name, toDoDescription: description };
        });
        localStorage.setItem("todos", JSON.stringify(jsonString));
    }
    render() {
        this.toDoList.forEach((todo) => {
            todo.render();
        });
    }
}
const currentTodos = localStorage.getItem('todos');
const toDosParsed = currentTodos ? JSON.parse(currentTodos) : [];
const myToDoList = new ToDoList(myTableContainer, toDosParsed);
myToDoList.render();
myForm === null || myForm === void 0 ? void 0 : myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const myFormData = new FormData(myForm);
    const myFormDataObject = Object.fromEntries(myFormData);
    const objectToAdd = {
        toDoName: myFormDataObject.toDoName,
        toDoDescription: myFormDataObject.toDoDescription,
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    };
    myToDoList.addToDoItem(objectToAdd);
    myForm.reset();
});
