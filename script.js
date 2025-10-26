document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');

  function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="task">${taskText}</span>
      <div class="btn-container">
        <button class="done">Selesai</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Tombol "Selesai" → langsung hapus
    const doneButton = listItem.querySelector('.done');
    doneButton.addEventListener('click', (e) => {
      e.stopPropagation();
      listItem.remove();
      saveTasks(); 
    });

    const deleteButton = listItem.querySelector('.delete');
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      listItem.remove();
      saveTasks(); 
    });

    taskList.appendChild(listItem);
  }
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTaskElement(taskText);
    saveTasks();
    taskInput.value = '';
  }

  addTaskButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Saat pertama kali halaman dimuat, ambil dari localStorage
  loadTasks();
});

  

  // =========================================================
  // 💾 BAGIAN LOCAL STORAGE
  // =========================================================

  // Fungsi untuk memuat task dari localStorage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTaskElement(task.text));
  }

  // Fungsi untuk menyimpan task ke localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(item => {
      const text = item.querySelector('.task').textContent;
      tasks.push({ text });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
