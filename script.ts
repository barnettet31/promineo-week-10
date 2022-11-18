const myForm = document.querySelector('#toDoForm') as HTMLFormElement; // HTMLFormElement
const myTableContainer = document.querySelector('#toDoContainer') as HTMLElement;
interface IToDoItem{
    toDoName:string;
    toDoDescription:string;
}

interface IToDoItemCls extends IToDoItem{
    id:string;
}



class ToDoList {
  toDoList: IToDoItemCls[];
  container: HTMLElement;
  callback: (data: IToDoItemCls, action: string, target: HTMLElement) => void;
  constructor(
    tableElement: HTMLElement,
    callback: (data: IToDoItemCls, action: string, target: HTMLElement) => void,
    initialToDos: IToDoItemCls[] | string = ''
  ) {
    this.toDoList = [];
    if(initialToDos.length > 0 && typeof initialToDos != 'string'){
      this.toDoList = [...initialToDos]
    }
    else{

      this.toDoList = []
    }

    this.container = tableElement;
    this.callback = callback;
  }
  addToDoItem(toDoItem: IToDoItemCls) {
    this.toDoList.push(toDoItem);
    this.callback(toDoItem, "add", this.container);
  }
  removeToDoItem(id: string) {
    const index = this.toDoList.findIndex((element) => element.id === id, 0);
    if (index > -1) {
      this.callback(this.toDoList[index], "remove", this.container);
      this.toDoList.splice(index, 1);
    }
  }
}
const createElement = function (item: IToDoItemCls): HTMLElement {
  const container = document.createElement("li");
  container.classList.add("list-group-item","d-flex", "justify-content-between", "align-items-center");
  const { id, toDoDescription, toDoName } = item;
  container.setAttribute("data-id", id);
  const construtor = `<div
             "
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
const handleUpdateToDos = (
  data: IToDoItemCls,
  action: string,
  target: HTMLElement
): void => {
  switch (action) {
    case "add":
      target.appendChild(createElement(data));
      document.querySelector(`[data-delete="${data.id}"]`)?.addEventListener('click', ()=>{
        myToDoList.removeToDoItem(data.id);
      })
      break;
    case "remove":
        document.querySelector(`[data-id="${data.id}"]`)?.remove();
        break;
    default:
      return;

  }
};
const myToDoList = new ToDoList(myTableContainer, handleUpdateToDos);
myForm?.addEventListener('submit',(event) => {
    event.preventDefault();
    const myFormData = new FormData(myForm) as unknown as Iterable<
      [IToDoItem, FormDataEntryValue]
    >;
    const myFormDataObject:IToDoItem = Object.fromEntries(myFormData) ;
    const objectToAdd:IToDoItemCls = {
        toDoName:myFormDataObject.toDoName,
        toDoDescription:myFormDataObject.toDoDescription,
        id: Date.now().toString(36) + Math.random().toString(36).substring(2)
    }
    myToDoList.addToDoItem(objectToAdd);
    myForm.reset();
})