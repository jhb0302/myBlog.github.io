// todo list

const todoForm = document.querySelector(".todo");
const todoInput = document.querySelector(".todo__input");
const todoList = document.querySelector(".todolist");

const TODOLIST_KEY = "todolist";
const EMOJI_KEY = "emoji";

let todoArr;
if (!localStorage.getItem(TODOLIST_KEY)) {
  todoArr = [];
} else {
  todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
}

//painters
function paintTodo(todoValue, todoId, todoIsChecked) {
  const todoListItem = document.createElement("li");
  const todoCheckEmoji = document.createElement("span");
  const todoDeleteEmoji = document.createElement("span");
  const todoText = document.createElement("span");

  todoListItem.id = todoId;
  todoCheckEmoji.classList.add(EMOJI_KEY);
  todoDeleteEmoji.classList.add(EMOJI_KEY, "emoji__delete", "hidden__opacity");
  todoCheckEmoji.textContent = "🔥";
  todoDeleteEmoji.textContent = "❌";
  todoText.textContent = todoValue;

  todoList.appendChild(todoListItem);
  todoListItem.appendChild(todoCheckEmoji);
  todoListItem.appendChild(todoText);
  todoListItem.appendChild(todoDeleteEmoji);
  if (todoIsChecked) {
    paintCheck(todoCheckEmoji);
  }
  todoCheckEmoji.addEventListener("click", todoChecked);
  todoDeleteEmoji.addEventListener("click", todoDelete);
  todoListItem.addEventListener("mouseenter", todoMouseEnter);
  todoListItem.addEventListener("mouseleave", todoMouseLeave);
}
function paintCheck(todoCheckEmoji) {
  const todoText = todoCheckEmoji.nextElementSibling;
  todoText.classList.toggle("checked");
  if (todoCheckEmoji.textContent === "🔥") {
    todoCheckEmoji.textContent = "✔️";
  } else {
    todoCheckEmoji.textContent = "🔥";
  }
}

//Event Listeners
function todoSubmit(event) {
  event.preventDefault();
  const todoId = event.timeStamp;
  const todoValue = todoInput.value;
  const todoIsChecked = false;
  todoInput.value = "";
  paintTodo(todoValue, todoId, todoIsChecked);

  todoArr.push({
    id: event.timeStamp,
    value: todoValue,
    checked: todoIsChecked,
  });
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(todoArr));
}
function todoChecked(event) {
  const target = event.target;
  const todoId = target.parentElement.id;
  paintCheck(target);
  const todoArrIndex = todoArr.findIndex((element) => element.id === +todoId);
  const isChecked = todoArr[todoArrIndex].checked;
  todoArr[todoArrIndex].checked = !isChecked;
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(todoArr));
}
function todoDelete(event) {
  const todoListItem = event.target.parentElement;
  todoArr = todoArr.filter((todo) => todo.id !== +todoListItem.id);
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(todoArr));
  todoListItem.remove();
}
function todoMouseEnter(event) {
  event.target.lastElementChild.classList.remove("hidden__opacity");
}
function todoMouseLeave(event) {
  event.target.lastElementChild.classList.add("hidden__opacity");
}

todoArr.forEach((todo) => paintTodo(todo.value, todo.id, todo.checked));

todoForm.addEventListener("submit", todoSubmit);
