const { describe, expect, it,  test } = require("@jest/globals");

const {  ToDoList, formEventHandler } = require("../script.ts");
 
test('Form Submission Creates To Do', ()=>{
document.body.innerHTML = `
 <div class="col-sm">
          <form class="card container p-4 mt-3" id="toDoForm">
            <div class="mb-3">
              <label for="name" class="form-label"
                >To Do Name</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                name="toDoName"
                placeholder="To Do Name"
                required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label"
                >To Do Details (max 50 characters)</label
              >
              <textarea
                class="form-control mb-3"
                id="description"
                rows="3"
                maxlength="75"
                name="toDoDescription"
                required></textarea>
              <button id="submit-button" type="submit" class="btn btn-primary mb-3">
                Submit To Do
              </button>
            </div>
          </form>
        </div>
        <div class="col-sm">
          <div id="toDoContainer">
            
          </div>
        </div>
`;
const myForm = document.querySelector("#toDoForm");
const myContainer = document.querySelector('#toDoContainer');
const myToDoList = new ToDoList(myContainer);

myForm.addEventListener('submit', formEventHandler);
document.querySelector('#name').value = 'Travis';
document.querySelector('#description').value = "This is a test";
document.querySelector('#submit-button').click();

expect(formEventHandler).toBeCalled();
expect(myToDoList.toDoList[0]).toHaveProperty('name', 'Travis');

})
