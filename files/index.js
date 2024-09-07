// import './index.css';

// Local Storage Elements
const localTodosContainer = document.getElementById('local-storage-todos-container');
const localInputElement = document.getElementById('local-storage-todo-input-ele');
const localAddTaskButton = document.getElementById('local-storage-add-task-btn');

// Session Storage Elements
const sessionTodosContainer = document.getElementById('session-storage-todos-container');
const sessionInputElement = document.getElementById('session-storage-todo-input-ele');
const sessionAddTaskButton = document.getElementById('session-storage-add-task-btn');

// Function to create To-Do list elements
function createTodoLiElements(todoArray, storageType) {
  return todoArray.map((todo, index) => {
    const liElement = document.createElement('li');
    const checkboxElement = document.createElement('input');
    const labelElement = document.createElement('label');

    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.setAttribute('id', `${storageType}-chbx-${index}`);
    labelElement.setAttribute('for', `${storageType}-chbx-${index}`);

    if (todo.checked) {
      checkboxElement.checked = true;
      labelElement.classList.add('todo-task-done');
    }

    checkboxElement.addEventListener('click', (e) => {
      const todoArray = JSON.parse(storageType === 'local' 
        ? localStorage.getItem('codesweetlyStore') 
        : sessionStorage.getItem('codesweetlySessionStore')) || [];
      const todoIndex = e.target.getAttribute('id').split('-')[2];
      todoArray[todoIndex].checked = !todoArray[todoIndex].checked;
      if (storageType === 'local') {
        localStorage.setItem('codesweetlyStore', JSON.stringify(todoArray));
      } else {
        sessionStorage.setItem('codesweetlySessionStore', JSON.stringify(todoArray));
      }
      labelElement.classList.toggle('todo-task-done');
    });

    labelElement.textContent = todo.text;
    liElement.append(checkboxElement, labelElement);
    return liElement;
  });
}

// Load and display To-Dos from storage on page load
window.addEventListener('load', () => {
  const localTodoArray = JSON.parse(localStorage.getItem('codesweetlyStore')) || [];
  const localTodoLiElements = createTodoLiElements(localTodoArray, 'local');
  localTodosContainer.replaceChildren(...localTodoLiElements);

  const sessionTodoArray = JSON.parse(sessionStorage.getItem('codesweetlySessionStore')) || [];
  const sessionTodoLiElements = createTodoLiElements(sessionTodoArray, 'session');
  sessionTodosContainer.replaceChildren(...sessionTodoLiElements);
});

// Add new To-Do to Local Storage
localAddTaskButton.addEventListener('click', () => {
  const currentTodoArray = JSON.parse(localStorage.getItem('codesweetlyStore')) || [];
  const newTodoArray = [...currentTodoArray, { checked: false, text: localInputElement.value }];
  const localTodoLiElements = createTodoLiElements(newTodoArray, 'local');
  localStorage.setItem('codesweetlyStore', JSON.stringify(newTodoArray));
  localTodosContainer.replaceChildren(...localTodoLiElements);
  localInputElement.value = '';
});

// Add new To-Do to Session Storage
sessionAddTaskButton.addEventListener('click', () => {
  const currentTodoArray = JSON.parse(sessionStorage.getItem('codesweetlySessionStore')) || [];
  const newTodoArray = [...currentTodoArray, { checked: false, text: sessionInputElement.value }];
  const sessionTodoLiElements = createTodoLiElements(newTodoArray, 'session');
  sessionStorage.setItem('codesweetlySessionStore', JSON.stringify(newTodoArray));
  sessionTodosContainer.replaceChildren(...sessionTodoLiElements);
  sessionInputElement.value = '';
});
