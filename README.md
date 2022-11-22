# Promineo Week  Homework

This is my homework for week 10 of the Promineo Front End Development Bootcamp. 

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [What I learned](#what-i-learned)
- [Author](#author)


## Overview

Coding Steps:
	•	Using HTML, Bootstrap, and JavaScript create a single page website that contains the following:
	•	A Bootstrap styled table representing your choice of data.
	•	A Bootstrap styled form that allows a user to add a new row to the table when clicking on submit.

### Links
- Live Site URL: [Live Site On GitHub Pages](https://barnettet31.github.io/promineo-week-10/index.html)

## My process
I started with the same basic layout as last week's app, honestly I was less worried about the design and much more on the functionality this week. 
I really wanted to take a hard look on how to create a vanilla ts crud application that could store it's data between reloads of the page.

And behold, here it is, my todo list app! Typescript enabled, and battle tested (yes I wrote tests too)



Ya boi doesn't know how to take it easy y'all! 

### What I learned
I decided to play around with OOP more in this project y'all and fiddled with the local storage api for state persistance. 

Found out that you can pass down a reference of a class to a child class in order to call functions from within that child. 

Also found out that json.stringify hates those references, so lesson learned on that one! 

Here's some of the code that I used to handle this for me (just the classes for now)





```ts
interface IToDoItem {
  toDoName: string;
  toDoDescription: string;
  id:string;
}

interface IToDoItemCls extends IToDoItem {
  id: string;
}
class ToDoItem {
  id:string;
  name:string;
  description:string;
  parentEl:HTMLElement;
  parentClassRef:ToDoList;
  constructor(id:string, name:string, description:string, parentEl:HTMLElement, parentRef:ToDoList){
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentEl = parentEl; 
    this.parentClassRef = parentRef;
  }
  render(){
    const {newHtml, ref} = this.generateHTML();
    if(ref){
      this.parentEl.replaceChild(newHtml, ref);
      return this.addEventListeners();
    }
    this.parentEl.appendChild(newHtml)
    this.addEventListeners();
  }
  update(name:string, description:string){
    this.name = name;
    this.description = description;
    this.render();
    this.parentClassRef.updateLocalStorage();
    
  }
  generateHTML(){
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
            `
    newDiv.innerHTML = innerHtmlString;
              
    return{
      newHtml:newDiv,
      ref:ref,
    }
  }
  addEventListeners(){
    const deleteButton = document.querySelector(`#delete-${this.id}`);
    console.log(deleteButton)
    const updateForm = document.querySelector(`#update-${this.id}`);
    deleteButton?.addEventListener('click', ()=>{
      myToDoList.removeToDoItem(this.id);
    });
    updateForm?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const myForm = e.target as HTMLFormElement;
      const { name, description } = Object.fromEntries(
        new FormData(myForm) as unknown as Iterable<
          [{ name: string; descrption: string }, FormDataEntryValue]
        >
      ); ;
      this.update(name, description);
    })
  }
}
class ToDoList {
  toDoList: ToDoItem[];
  container: HTMLElement;
  constructor(container: HTMLElement, defaultValues:IToDoItem[] = []) {
    this.container = container;
    this.toDoList = defaultValues.map((todo) => {
      return new ToDoItem(
        todo.id,
        todo.toDoName,
        todo.toDoDescription,
        myTableContainer,
        this
      );
    });
  }
  addToDoItem(toDoItem: IToDoItemCls) {
    const newTodo = new ToDoItem(
      toDoItem.id,
      toDoItem.toDoName,
      toDoItem.toDoDescription,
      this.container,
      this
    );
    this.toDoList.push(newTodo);
    this.updateLocalStorage();
    this.render();
  }
  removeToDoItem(id: string) {
    const removeThis = document.querySelector(`#${id}`);
    removeThis?.remove();
    const newTodos = this.toDoList.filter((todo) => todo.id != id);
    this.toDoList = newTodos;
    this.updateLocalStorage();
  }
  updateLocalStorage(){
    console.log(this.toDoList);
    const jsonString = this.toDoList.map(({ id, name, description }) => {
      return { id, toDoName:name, toDoDescription:description };
    });
        localStorage.setItem("todos", JSON.stringify(jsonString));

  }
  render() {
    this.toDoList.forEach((todo) => {
      todo.render();
    });
  }
}
```





## Author

- Twitter - [@barnett_travis5](https://twitter.com/barnett_travis5)
- LinkedIn - [@travis-barnette-ba7987237](https://www.linkedin.com/in/travis-barnette-ba7987237/)