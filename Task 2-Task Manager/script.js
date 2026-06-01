const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskCounter = document.getElementById("taskCounter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    taskCounter.textContent =
        `Total Tasks: ${total} | Completed: ${completed}`;
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        if(task.completed){
            taskText.classList.add("completed");
        }

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const doneBtn = document.createElement("button");
        doneBtn.innerHTML = "✔";
        doneBtn.classList.add("done-btn");

        doneBtn.addEventListener("click", () => {

            tasks[index].completed =
            !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        buttons.appendChild(doneBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask() {

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});

clearAllBtn.addEventListener("click", () => {

    if(confirm("Delete all tasks?")){

        tasks = [];

        saveTasks();
        renderTasks();
    }
});

renderTasks();