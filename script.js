const form = document.querySelector('form');
const taskList = document.querySelector('#task-list');
let tasks = []; // Array to store tasks


// Function to add a task to the tasks array and render the tasks
function addTask(task, taskDateTime) {
    // Check if task is empty
    if (task === '') {
        alert('Please enter a task');
    } else {
        // Add the task to the tasks array
        tasks.push({
            task: task,
            dateTime: new Date(taskDateTime),
            id: `task-${Date.now()}` // Generate a unique id for each task
        });

        // Sort tasks array based on date and time
        tasks.sort((a, b) => a.dateTime - b.dateTime);

        saveTask(); // Save tasks to local storage
        renderTasks(); // Render tasks after adding and sorting
    }
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the task list
    tasks.forEach(({ task, dateTime, id }) => {
        // Create a list item for each task
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="${id}" /> 
            <label for="${id}">
                <img src="unchecked.png" class="checkbox-image" />
            </label>
            <span>${task}</span>
            <br />
            <small>Due: ${dateTime.toLocaleString()}</small>
            <button class="delete-btn">Delete</button>
        `;
        // Append the list item to the task list
        taskList.appendChild(listItem);
    });
    expiryCheck(); // Check for expired tasks
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Get the input values
    const input = document.querySelector('#task-input');
    const dateTimeInput = document.querySelector('#task-datetime');
    const task = input.value;
    const taskDateTime = dateTimeInput.value;

    addTask(task, taskDateTime); // Add the task

    // Clear the input fields
    input.value = '';
    dateTimeInput.value = '';
});

// Event listener for delete button click
taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const listItem = event.target.parentElement;
        const taskId = listItem.querySelector('input').id;
        tasks = tasks.filter(task => task.id !== taskId); // Remove task by id
        
        saveTask(); // Save tasks to local storage
        renderTasks(); // Re-render tasks after deletion
    }
});

// Function to check for expired tasks
function expiryCheck() {
    const currentDate = new Date();
    tasks.forEach(({ task, dateTime, id }) => {
        const listItem = document.getElementById(id).parentElement;
        const dateElement = listItem.querySelector('small');

        if (currentDate > dateTime) {
            listItem.classList.add('expired');
            dateElement.classList.add('expired-date'); // Add CSS class to date element
            if (!dateElement.textContent.includes('Expired')) {
                dateElement.textContent = `Due: ${dateTime.toLocaleString()} (Expired)`;
            }
        } else {
            listItem.classList.remove('expired');
            dateElement.classList.remove('expired-date'); // Remove CSS class from date element
            dateElement.textContent = `Due: ${dateTime.toLocaleString()}`;
        }
    });
}
function saveTask() {
    const stringifiedTasks = JSON.stringify(tasks); // Use the 'tasks' array
    localStorage.setItem('tasks', stringifiedTasks);
}

    function loadTask() {
        const retrievedTasks = localStorage.getItem('tasks');
        tasks = retrievedTasks ? JSON.parse(retrievedTasks).map(task => {
            task.dateTime = new Date(task.dateTime); // Convert string to date object
            return task;
        }) : [];
        renderTasks(); // Render tasks after loading from local storage
    }
// Load tasks from local storage when the page loads
loadTask();