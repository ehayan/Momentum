const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todo-list');

const TODOS_KEY = 'todos';

let toDos = [];

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = todoInput.value; //입력된 값 복사
  todoInput.value = ''; //submit 될 때, 비우기

  const newToDoObj = {
    id: Date.now(),
    text: newToDo,
  };

  toDos.push(newToDoObj);
  panintToDo(newToDoObj);
  saveToDos();
}

function panintToDo(newToDo) {
  //입력한 값을 html에 만듦
  const li = document.createElement('li');
  li.id = newToDo.id;
  const span = document.createElement('span');
  const button = document.createElement('button');

  li.appendChild(span);
  li.appendChild(button);

  span.innerText = newToDo.text;
  button.innerText = '❌';
  button.addEventListener('click', DeleteToDo);

  todoList.appendChild(li);
}

function DeleteToDo(event) {
  const li = event.target.parentElement;
  console.log(typeof li.id);

  toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));

  li.remove();
  saveToDos();
}

function saveToDos() {
  //localstorage에 저장하기 위해 형변환(stirng으로만 저장)
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //기존 todo 복원
  parsedToDos.forEach(panintToDo);
}

todoForm.addEventListener('submit', handleToDoSubmit);
