document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('#todo-input');
    const addButton = document.querySelector('#add-button');
    const todoList = document.querySelector('#todo-list');

    loadTodos();

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            todoInput.value = '';
            saveTodoItem(todoText);
        }
    });

    function addTodoItem(todoText, save = true) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const span = document.createElement('span');
        span.textContent = todoText;

        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.style.color = 'gray';

        deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.color = 'black';
        });
        deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.color = 'gray';
        });

        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            removeTodoItem(todoText);
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function saveTodoItem(todoText) {
        const todos = getTodosFromStorage();
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoItem(todoText) {
        let todos = getTodosFromStorage();
        todos = todos.filter(todo => todo !== todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = getTodosFromStorage();
        todos.forEach(todoText => {
            addTodoItem(todoText, false);
        });
    }

    function getTodosFromStorage() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
});


