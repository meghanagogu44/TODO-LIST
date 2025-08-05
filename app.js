let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text !== '') {
    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    updateTaskList();
  }
};

const updateTaskList = () => {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})"/>
          <p>${task.text}</p>
          <div class="icons">
            <span onclick="editTask(${index})">✏️</span>
            <span onclick="deleteTask(${index})">🗑️</span>
          </div>
        </div>
      </div>
    `;
    taskList.appendChild(listItem);
  });

  // ✅ Update progress number (e.g., 2/5)
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  document.getElementById('numbers').textContent = `${completedCount}/${totalCount}`;

  // ✅ Update progress bar width
  const progressBar = document.getElementById('progress');
  const progressPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  progressBar.style.width = `${progressPercent}%`;
};

const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
};

const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    updateTaskList();
  }
};

// Button listener
document.getElementById("newtask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
