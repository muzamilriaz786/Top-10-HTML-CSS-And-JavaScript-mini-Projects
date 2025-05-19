
// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoStats = document.getElementById('todo-stats');

// Tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks(filter = 'all') {
    todoList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true; // 'all'
    });

    if (filteredTasks.length === 0) {
        todoList.innerHTML = '<li style="text-align: center; padding: 20px; color: #b2bec3;">No tasks found</li>';
    } else {
        filteredTasks.forEach((task, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''} data-id="${index}">
                <span class="todo-text">${task.text}</span>
                <div class="todo-actions">
                    <button class="edit-btn" data-id="${index}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            todoList.appendChild(todoItem);
        });
    }

    updateStats();
}

// Add new task
function addTask() {
    const text = todoInput.value.trim();
    if (text === '') return;

    tasks.push({ text, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    todoInput.value = '';
    renderTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
}

// Edit task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
    }
}

// Delete task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
    }
}

// Update task stats
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;

    todoStats.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} left`;
}

// Filter tasks
function filterTasks(filter) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTasks(filter);
}

// Event Listeners
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
        toggleTask(parseInt(e.target.dataset.id));
    } else if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
        const btn = e.target.classList.contains('edit-btn') ? e.target : e.target.closest('.edit-btn');
        editTask(parseInt(btn.dataset.id));
    } else if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
        const btn = e.target.classList.contains('delete-btn') ? e.target : e.target.closest('.delete-btn');
        deleteTask(parseInt(btn.dataset.id));
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
});

// Initial render
renderTasks();
