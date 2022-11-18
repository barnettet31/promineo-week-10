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
  const row = document.createElement("tr");
  const { id, toDoDescription, toDoName } = item;
  row.classList.add("row");
  row.setAttribute("data-id", id);
  let td1 = document.createElement("td");
  td1.textContent = toDoName;
    td1.classList.add('col')
  row.appendChild(td1);
  let td2 = document.createElement("td");
  td2.classList.add('col')
  td2.textContent = toDoDescription;
  
  let deleteTd = document.createElement("td");
deleteTd.classList.add('col')
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = 'Delete This'
  deleteButton.addEventListener("click", () => {
    myToDoList.removeToDoItem(id);
  });
  deleteTd.appendChild(deleteButton);   
    row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(deleteTd);
  return row;
};
const handleUpdateToDos = (
  data: IToDoItemCls,
  action: string,
  target: HTMLElement
): void => {
  switch (action) {
    case "add":
      target.appendChild(createElement(data));
      break;
    case "remove":
        document.querySelector(`[data-id=${data.id}]`)?.remove();
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