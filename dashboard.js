const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const placeholder = document.getElementById('placeholder');

let editingTask = null;

const loadTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(taskText => {
    createTaskElement(taskText);
  });
};

const createTaskElement = (taskText) => {
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
  
  taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(taskItem));
  taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskItem));

  taskList.appendChild(taskItem);
};

const addTask = () => {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;

  if (editingTask) {
    const taskTextEl = editingTask.querySelector('.task-text');
    taskTextEl.textContent = taskText;

    updateLocalStorage();

    addTaskBtn.textContent = 'Add';
    editingTask = null;
  } else {
    createTaskElement(taskText);

    saveTaskToLocalStorage(taskText);
  }

  newTaskInput.value = '';
  placeholder.style.display = 'none';
};

const deleteTask = (taskItem) => {
  taskItem.remove();
  updateLocalStorage();
  if (taskList.children.length === 0) {
    placeholder.style.display = 'block';
  }
};

const editTask = (taskItem) => {
  const taskTextEl = taskItem.querySelector('.task-text');
  const currentText = taskTextEl.textContent;

  newTaskInput.value = currentText;
  addTaskBtn.textContent = 'Update';

  editingTask = taskItem;
};

const saveTaskToLocalStorage = (taskText) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const updateLocalStorage = () => {
  const tasks = [];
  document.querySelectorAll('.task-text').forEach(taskTextEl => {
    tasks.push(taskTextEl.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

window.addEventListener('load', loadTasks);

addTaskBtn.addEventListener('click', addTask);


const options = {
  series: [
    {
      name: 'Current Week',
      data: [15000, 16000, 17000, 14000, 18000, 19000, 20000]
    },
    {
      name: 'Previous Week',
      data: [13000, 14000, 15000, 13000, 16000, 17000, 18000]
    }
  ],
  chart: {
    type: 'line',
    height: 200, // Increased height for better proportions
    width: '100%', // Ensures it stretches horizontally
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  },
  colors: ['#5A67D8', '#805AD5'],
  markers: {
    size: 5,
    hover: {
      size: 7
    }
  },
  xaxis: {
    categories: ['Feb 14', 'Feb 15', 'Feb 16', 'Feb 17', 'Feb 18', 'Feb 19', 'Feb 20'],
    labels: {
      style: {
        colors: '#A0AEC0',
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#A0AEC0',
        fontSize: '12px'
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val) {
        return `$${val.toLocaleString()}`;
      }
    }
  },
  grid: {
    borderColor: '#EDF2F7',
    strokeDashArray: 5
  }
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
