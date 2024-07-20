document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('ft_list');
    const newTaskBtn = document.getElementById('newTaskBtn');

    newTaskBtn.addEventListener('click', function() {
        const taskText = prompt('Enter your new task:');
        if (taskText !== null && taskText.trim() !== '') {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerText = taskText;
            taskDiv.addEventListener('click', function() {
                const confirmDelete = confirm('Do you want to remove this task?');
                if (confirmDelete) {
                    taskDiv.remove();
                    saveTasksToCookie();
                }
            });
            todoList.insertBefore(taskDiv, todoList.firstChild);
            saveTasksToCookie();
        }
    });

    function saveTasksToCookie() {
        const tasks = Array.from(todoList.children).map(task => task.innerText);
        document.cookie = `tasks=${JSON.stringify(tasks)}`;
    }

    function loadTasksFromCookie() {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'tasks') {
                const tasks = JSON.parse(value);
                tasks.forEach(taskText => {
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('task');
                    taskDiv.innerText = taskText;
                    taskDiv.addEventListener('click', function() {
                        const confirmDelete = confirm('Do you want to remove this task?');
                        if (confirmDelete) {
                            taskDiv.remove();
                            saveTasksToCookie();
                        }
                    });
                    todoList.insertBefore(taskDiv, todoList.firstChild);
                });
            }
        }
    }

    loadTasksFromCookie();
});
