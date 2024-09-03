const form = document.querySelector('form');
        const taskList = document.querySelector('#task-list');

        function addTask(task) {
            const listItem = document.createElement('li');
            const uniqueId = `task-${Date.now()}`; // Generate a unique ID for each task
        
            listItem.innerHTML = `
                <input type="checkbox" id="${uniqueId}" />
                <label for="${uniqueId}">
                    <img src="unchecked.png" alt="Unchecked" class="checkbox-image" />
                </label>
                <span>${task}</span>
                <button class ="delete-btn">Delete</button>
            `;
            taskList.appendChild(listItem);
        }

        form.addEventListener('submit', (e) => {
            event.preventDefault();
            const input = document.querySelector('#task-input');
            const task = input.value;
            addTask(task);
            input.value = '';
        });

        taskList.addEventListener('click', (event) => {
            if(event.target.tagName === 'BUTTON') {
                const listIteam = event.target.parentElement;
                taskList.removeChild(listIteam);
            }
        });