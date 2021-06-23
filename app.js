const toDoInput = document.querySelector("Input");
const toDoForm = document.querySelector(".toDoForm");
const toDoList = document.querySelector(".toDoList");
const toDoMain = document.querySelector(".toDoMain");
const TODO__LS = "toDos_ls";
const checkedGray = "rgba(0,0,0,0.3)";
const checkedGreen = "#348F50";
let toDoArray = [];

function saveToDo(text){
    localStorage.setItem(TODO__LS, JSON.stringify(toDoArray));
}
function deleteToDo(event){
    const delBTN = event.target.parentNode;
    toDoList.removeChild(delBTN);
    const cleanToDo = toDoArray.filter(function(toDo){
        return toDo.id !== parseInt(delBTN.id);

    });
    toDoArray = cleanToDo;
    saveToDo();
}
function checkToDo(event){
   const check = event.target.parentNode;
    const icon = check.querySelector("i");
    const text = check.querySelector("span");
    const bar = check.querySelector("div");
    const length = text.innerText.length * 12;
    text.style.width = `${length}px`;
    if (text.style.color === "black"){
        text.style.color = checkedGray;
        icon.style.color = checkedGreen;
        bar.classList.remove("none");
        bar.style.width = `${length}px`;
    }else{
        text.style.color = "black";
        icon.style.color = checkedGray;
        bar.classList.add("none");
    }

    
}
function writeToDo(text){
    const li = document.createElement("li");
    const checkIcon = document.createElement("i");
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add("none");
    checkIcon.classList.add("fa-check", "fas");
    li.addEventListener("click", checkToDo);
    li.addEventListener("dblclick",deleteToDo);
    const span = document.createElement("span");
    const newId = toDoArray.length + 1;
    span.innerText = text;
    li.appendChild(checkIcon);
    li.appendChild(span);
    li.appendChild(bar);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text:text,
        id:newId
    };
    toDoArray.push(toDoObj);
    saveToDo();
}

function getToDo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    writeToDo(currentValue);
    toDoInput.value = "";
}
function loadToDo(){
    const loadedToDo = localStorage.getItem(TODO__LS);
    if(loadedToDo !==null){
        const parsedToDo = JSON.parse(loadedToDo);
        parsedToDo.forEach(function(toDo){
            writeToDo(toDo.text);
        })
    }
}

function handleMainDown(){
    toDoMain.style.padding = "10px";
    
}
function handleMainUp(){
    toDoMain.style.padding = "0px";
}
function init(){
    loadToDo();
    toDoMain.addEventListener("mousedown",handleMainDown);
    toDoMain.addEventListener("mouseup",handleMainUp);
    toDoForm.addEventListener("submit", getToDo);
}
init();