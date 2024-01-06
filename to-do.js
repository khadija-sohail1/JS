const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const deleteAllButton = document.querySelector('.delete-all');

taskInput.addEventListener('keydown', handleEnter);

function createEl(type, attributes = {}) {
  return Object.assign(document.createElement(type), attributes);
}

function handleEnter(event) {
  if (event.key === 'Enter' && taskInput.value.trim() !== '') {
    event.preventDefault();
    addTask();
  }
}

function addTask() {
const taskText = taskInput.value.trim();
if (!taskText) return;

const createEl = (type, attributes = {}) => Object.assign(document.createElement(type), attributes);

const taskItem = createEl('li', { className: 'task-item' });
const checkbox = createEl('input', { type: 'checkbox', onclick: () => toggleStrikeThrough(taskItem, checkbox) });
const taskTextElement = createEl('span', { textContent: taskText });
const editInput = createEl('input', { type: 'text', value: taskText, style: 'display: none;', onkeydown: (event) => saveEditedTask(event, taskTextElement, editInput) });
const buttonsContainer = createEl('div', { className: 'task-buttons' });
['Edit', 'Delete'].forEach((btnText) => {
const button = createEl('button', { textContent: btnText });
button.onclick = btnText === 'Edit' ? () => toggleEdit(taskTextElement, editInput) : () => deleteTask(taskItem);
buttonsContainer.appendChild(button);
});

taskItem.append(checkbox, taskTextElement, editInput, buttonsContainer);
taskList.appendChild(taskItem);
taskInput.value = '';

updateDeleteAllButton();
saveToLocalStorage();
}


function toggleEdit(taskTextElement, editInput) {
  taskTextElement.style.display = 'none';
  editInput.style.display = 'inline-block';
  editInput.focus();
}

function toggleStrikeThrough(taskItem, checkbox) {
  const taskTextElement = taskItem.querySelector('span');
  taskTextElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  saveToLocalStorage();
}

function saveEditedTask(event, taskTextElement, editInput) {
  if (event.key === 'Enter') {
    event.preventDefault();
    taskTextElement.textContent = editInput.value;
    taskTextElement.style.display = 'inline-block';
    editInput.style.display = 'none';
    saveToLocalStorage();
  }
}

function deleteTask(taskItem) {
  taskItem.remove();
  updateDeleteAllButton();
  saveToLocalStorage();
}

function updateDeleteAllButton() {
  deleteAllButton.style.display = taskList.children.length >= 2 ? 'block' : 'none';
}

function deleteAllTasks() {
  taskList.innerHTML = '';
  updateDeleteAllButton();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const tasks = Array.from(taskList.children).map(taskItem => ({
    text: taskItem.querySelector('span').textContent,
    checked: taskItem.querySelector('input[type="checkbox"]').checked
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      const taskItem = createEl('li', { className: 'task-item' });
      const checkbox = createEl('input', { type: 'checkbox', checked: task.checked, onclick: () => toggleStrikeThrough(taskItem, checkbox) });
      const taskTextElement = createEl('span', { textContent: task.text });
      const editInput = createEl('input', { type: 'text', value: task.text, style: 'display: none;', onkeydown: (event) => saveEditedTask(event, taskTextElement, editInput) });
      const editButton = createEl('button', { textContent: 'Edit', onclick: () => toggleEdit(taskTextElement, editInput) });
      const deleteButton = createEl('button', { textContent: 'Delete', onclick: () => deleteTask(taskItem) });
      const buttonsContainer = createEl('div', { className: 'task-buttons' });
      buttonsContainer.append(editButton, deleteButton);
      taskItem.append(checkbox, taskTextElement, editInput, buttonsContainer);
      taskList.appendChild(taskItem);
    });
    updateDeleteAllButton();
  }
}

loadFromLocalStorage();