const taskList =
    document.getElementById("taskList");

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask(){

    const taskInput =
        document.getElementById("taskInput");

    const descriptionInput =
        document.getElementById("descriptionInput");

    const priorityInput =
        document.getElementById("priorityInput");

    const dateInput =
        document.getElementById("dateInput");

    const taskText =
        taskInput.value.trim();

    const description =
        descriptionInput.value.trim();

    const priority =
        priorityInput.value;

    const taskDate =
        dateInput.value;

    if(taskText === ""){

        alert("Vui lòng nhập tên công việc!");

        return;
    }

    const task = {

        name: taskText,
        description: description,
        priority: priority,
        date: taskDate,
        completed: false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index) => {

        let priorityClass = "";

        if(task.priority === "Cao"){

            priorityClass = "high";

        }
        else if(task.priority === "Trung bình"){

            priorityClass = "medium";

        }
        else{

            priorityClass = "low";

        }

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td class="task-name">
                ${task.name}
            </td>

            <td>
                ${task.description}
            </td>

            <td>

                <span class="priority ${priorityClass}">
                    ${task.priority}
                </span>

            </td>

            <td>
                ${task.date}
            </td>

            <td>

                <span class="status ${task.completed ? 'done' : 'working'}">

                    ${task.completed ? 'Hoàn thành' : 'Đang làm'}

                </span>

            </td>

            <td>

                <button class="btn btn-success btn-sm me-1"
                        onclick="completeTask(${index})">

                    Hoàn thành

                </button>

                <button class="btn btn-primary btn-sm me-1"
                        onclick="editTask(${index})">

                    Sửa

                </button>

                <button class="btn btn-danger btn-sm"
                        onclick="deleteTask(${index})">

                    Xóa

                </button>

            </td>

        `;

        taskList.appendChild(row);

    });

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function completeTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function editTask(index){

    const newTask =
        prompt("Chỉnh sửa công việc:",
               tasks[index].name);

    if(newTask !== null &&
       newTask.trim() !== ""){

        tasks[index].name = newTask;

        saveTasks();

        renderTasks();
    }
}

function searchTask(){

    const input =
        document.getElementById("searchInput")
                .value
                .toLowerCase();

    const rows =
        document.querySelectorAll("#taskList tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if(text.includes(input)){

            row.style.display = "";

        }
        else{

            row.style.display = "none";

        }

    });

}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}