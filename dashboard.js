const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const placeholder = document.getElementById('placeholder');

// Variable to hold the task being edited
let editingTask = null;

// Function to add a new task
const addTask = () => {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return; // Ignore empty input

  if (editingTask) {
    // If we're editing a task, update it
    const taskTextEl = editingTask.querySelector('.task-text');
    taskTextEl.textContent = taskText;

    // Reset the button to "Add" after updating
    addTaskBtn.textContent = 'Add';
    editingTask = null; // Clear editing task state
  } else {
    // Create a new task
    const taskItem = document.createElement('div');
    taskItem.className = 'relative group overflow-hidden';
    taskItem.innerHTML = `
      <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-md transition-transform group-hover:translate-x-14">
        <div class="flex-1">
          <p class="font-semibold text-gray-800 task-text">${taskText}</p>
          <p class="text-sm text-gray-500">Just now</p>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 h-full w-12 bg-green-500 flex items-center justify-center rounded-l-lg text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer edit-btn">
        <i class="fas fa-edit"></i>
      </div>
      <div
        class="absolute top-0 right-0 h-full w-12 bg-red-500 flex items-center justify-center rounded-r-lg text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer delete-btn">
        <i class="fas fa-trash"></i>
      </div>
    `;
  
    // Add edit functionality
    taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(taskItem));

    // Add delete functionality
    taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskItem));

    // Append task to task list
    taskList.appendChild(taskItem);

    // Hide placeholder if necessary
    placeholder.style.display = 'none';
  }

  // Clear input
  newTaskInput.value = '';
};

// Function to delete a task
const deleteTask = (taskItem) => {
  taskItem.remove();
  if (taskList.children.length === 0) {
    placeholder.style.display = 'block';
  }
};

// Function to edit a task
const editTask = (taskItem) => {
  const taskTextEl = taskItem.querySelector('.task-text');
  const currentText = taskTextEl.textContent;

  // Populate the input field with the current task's text
  newTaskInput.value = currentText;

  // Change the button text to "Update"
  addTaskBtn.textContent = 'Update';

  // Set the editing task to the task we're currently editing
  editingTask = taskItem;
};

// Event listener for adding or updating a task
addTaskBtn.addEventListener('click', addTask);

// Hide placeholder initially if tasks exist
if (taskList.children.length > 0) {
  placeholder.style.display = 'none';
}
