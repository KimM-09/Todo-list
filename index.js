//Gain access to the elements by their ids using the getElementById() method
const text = document.getElementById("text");
const addTask = document.getElementById("add-task-btn");
const saveTask = document.getElementById("save-todo-btn");
const listBox = document.getElementById("list");
const saveInd = document.getElementById("saveIndex");

//An empty array to hold the To-do list as items are added
let toDos = [];

//Create an event listener to save an added to-do on click
addTask.addEventListener("click", (event) => {
    event.preventDefault();
    let todo = localStorage.getItem("todo");

    //if no todo array exists, create a blank one then push the newly added task and save the array again
    if(todo === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(todo);
    }
    toDos.push(text.value)
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(toDos));
    displayToDo();
});

//Display the list to the webpage
function displayToDo() {
    let todo = localStorage.getItem("todo");
    if(todo === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(todo);
    }
    let htmlCode="";
    //loop through the array and for each item, add 2 buttons, and assign the whole HTML code to the listBox element using the innerHTML attribute
    toDos.forEach((list, ind) => {
        htmlCode += `<div class='flex mb-4 items-center'>
   <p class='w-full text-white'>${list}</p>
   <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
   <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
</div>`;
    });
    listBox.innerHTML = htmlCode;
}

//Delete items from your todo list using splice to remove the correct item from the array
function deleteTodo (ind) {
    let todo = localStorage.getItem("todo");
    toDos = JSON.parse(todo);
    toDos.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(toDos));
    displayToDo();
};

//Update the todo list
function edit (ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    toDos = JSON.parse(todo);
    text.value = toDos[ind];
    addTask.style.display = "none";
    saveTask.style.display = "block";
}
//Once finished editing the list item, save it
saveTask.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    toDos = JSON.parse(todo);
    let id = saveInd.value;
    toDos[id] = text.value;
    addTask.style.display = "block";
    saveTask.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(toDos));
    displayToDo();
})

//display the list of todos when re-freshing or closing & reopening the page
displayToDo();