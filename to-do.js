document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      addTask();
    }
  });

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const deleteAllButton = document.querySelector('.delete-all');

    if (taskInput.value.trim() === '') return;

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `<span>${taskInput.value}</span>
      <button class="delete-task" onclick="deleteTask(this.parentNode)">Delete</button>`;

    taskList.appendChild(taskItem);
    taskInput.value = '';

    deleteAllButton.style.display = taskList.children.length >= 2 ? 'block' : 'none';
  }

  function deleteTask(taskItem) {
    const li = taskItem;
    li.remove();
    
    const deleteAllButton = document.querySelector('.delete-all');
    deleteAllButton.style.display = taskList.children.length >= 2 ? 'block' : 'none';
  }

  function deleteAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    const deleteAllButton = document.querySelector('.delete-all');
    deleteAllButton.style.dis
  }