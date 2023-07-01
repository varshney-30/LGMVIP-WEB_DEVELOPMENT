let colors = new Array("#DEB887","#F08080","#66CDAA","#F0E68C","#CD5C5C","#008080","#E9967A");

let colorIndex = 0;

function changeColor() {
    document.bgColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

function fun()
{
    setInterval("changeColor()",2000)
}


const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todolist = document.getElementById('todolist');

let editTodo = null;

//Add todo
const addTodo = () =>{
   const inputText = inputBox.value.trim();
   if(inputText.length <= 0) 
   {
        alert("You must write something in your to do");
        return;
   }

   if(addBtn.value === "Edit")
   {
        editLocalTodo( editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodo(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
   }
   else
   {
   const li = document.createElement("li");
   const p = document.createElement("p");
   p.innerHTML = inputText;
   li.appendChild(p);

   const editBtn = document.createElement("button");
   editBtn.innerText = "Edit";
   editBtn.classList.add("btn","edit");
   li.appendChild(editBtn);

   const deleteBtn = document.createElement("button");
   deleteBtn.innerText = "Remove";
   deleteBtn.classList.add("btn","delete");
   li.appendChild(deleteBtn);

   todolist.appendChild(li);
   inputBox.value= "";

   saveLocalTodo(inputText);

   }
}


//edit or delete todo
const updateTodo = (e) =>{
    if(e.target.innerHTML === "Remove")
    {
       todolist.removeChild(e.target.parentElement);
       deleteLocalTodo(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit")
    {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

const saveLocalTodo = (todo) =>
{
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
         todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

const getLocalTodo = () =>{
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(element => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = element;
            li.appendChild(p);

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn","edit");
            li.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn","delete");
            li.appendChild(deleteBtn);

            todolist.appendChild(li);
            
        });
    }
}

const deleteLocalTodo = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
         todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));

}

const editLocalTodo = (todo) =>
{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getLocalTodo);
addBtn.addEventListener('click',addTodo);
todolist.addEventListener('click',updateTodo);