const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const change = $(".todo__btn");
const input = $("#txtInput");
const list = $(".todo__list");
const form = $(".todo__form");

const clear = $(".clear");
const footItem = $$(".foot__center p");
const leftItem = $(".count");
let todos = [
  {
    text: "Complete online JavaScript course",
    status: true,
  },
  {
    text: "Jog around the park 3x",
    status: false,
  },
  {
    text: "10 minutes meditation",
    status: false,
  },
  {
    text: "Read for 1 hour",
    status: false,
  },
  {
    text: "Pick up groceries",
    status: false,
  },
  {
    text: "Complete Todo App on Frontend Mentor",
    status: false,
  },
];
let fill = 0;
let prevItem = null;
let nextItem = 0;

renderTodos(todos);

// Change Theme
change.addEventListener("click", changeTheme);

// Count Item left
function countItemLeft() {
  const a = todos.filter((item) => item.status === false);
  leftItem.innerText = a.length;
}

// Focus Input
form.addEventListener("click", () => input.focus());

// Add Todo
input.addEventListener("keyup", function (e) {
  if (
    (e.key === "Enter" || e.keyCode === 13) &&
    e.target.value.length != 0 &&
    e.target.value.trim().length != 0
  ) {
    todos.push({
      text: e.target.value,
      status: false,
    });
    input.value = "";
    if (fill == 1) {
      renderTodosActive();
    } else if (fill == 2) {
      renderTodosComeplete();
    } else {
      renderTodos(todos);
    }
  }
});

function renderTodos(data) {
  const listTodo = data.map(
    (item, index) => `
         <li class="list-item" data-id="${index}" draggable="true" >
            <div class="item-check ${item.status == true ? `active` : ``}">
            <div class="inner_circle"></div>
            </div>
            <p ${item.status == true ? `class="del"` : ``}>${item.text}</p>
            ${item.status == true ? `<div class="item-delete" ></div>` : ``}
          </li>`
  );
  list.innerHTML = listTodo.join("");
  countItemLeft();
  if (fill == 0) {
    renderTodosAll();
  }
}

// Complete Todo
function completeToDo(index) {
  todos[index].status = !todos[index].status;
}

// Delete Todo
function deleteToDo(index) {
  todos.splice(index, 1);
}

clear.addEventListener("click", function () {
  deleteToDoComplete();
  if (fill == 1) {
    renderTodosActive();
  } else if (fill == 2) {
    renderTodosComeplete();
  } else {
    renderTodosAll();
  }
});

// Delete Todo Complete
function deleteToDoComplete() {
  const a = todos.filter((item) => item.status === false);
  todos = a;
  renderTodos(todos);
}

// Add Active
footItem.forEach((item, index) => {
  item.addEventListener("click", () => {
    removeActive();
    item.classList.add("active");
    if (index == 1) {
      fill = 1;
      renderTodosActive();
    } else if (index == 2) {
      fill = 2;
      renderTodosComeplete();
    } else {
      fill = 0;
      renderTodos(todos);
    }
  });
});

// Render Todos Active
function renderTodosActive() {
  const listIndex = [];
  const todosActive = todos.filter((item, index) => {
    if (item.status == false) listIndex.push(index);
    return item.status == false;
  });
  renderTodos(todosActive);
  const listCheck = $$(".item-check");

  listCheck.forEach((item, index) =>
    item.addEventListener("click", function () {
      completeToDo(listIndex[index]);
      renderTodosActive();
    })
  );

  const listTodo = $$(".list-item");

  listTodo.forEach((item, index) => {
    item.addEventListener("dragstart", (e) => {
      e.target.style.opacity = 1;
      e.effectAllowed = "move";
      prevItem = listIndex[index];
    });

    item.addEventListener("dragover", (e) => {
      if (e.target.classList.contains("list-item")) {
        nextItem = listIndex[e.target.dataset.id];
      } else {
        nextItem = listIndex[e.target.parentNode.dataset.id];
      }
    });

    item.addEventListener("dragend", (e) => {
      changeIndex(prevItem, nextItem);
      renderTodosActive();
    });
  });
}

// Render Todos Completed
function renderTodosComeplete() {
  const listIndex = [];
  const todosComplete = todos.filter((item, index) => {
    if (item.status == true) listIndex.push(index);
    return item.status == true;
  });
  renderTodos(todosComplete);

  const listDel = $$(".item-delete");
  const listCheck = $$(".item-check");

  listDel.forEach((item, index) =>
    item.addEventListener("click", function () {
      deleteToDo(listIndex[index]);
      renderTodosComeplete();
    })
  );

  listCheck.forEach((item, index) =>
    item.addEventListener("click", function () {
      completeToDo(listIndex[index]);
      renderTodosComeplete();
    })
  );

  const listTodo = $$(".list-item");

  listTodo.forEach((item, index) => {
    item.addEventListener("dragstart", (e) => {
      e.target.style.opacity = 1;
      e.effectAllowed = "move";
      prevItem = listIndex[index];
    });

    item.addEventListener("dragover", (e) => {
      if (e.target.classList.contains("list-item")) {
        nextItem = listIndex[e.target.dataset.id];
      } else {
        nextItem = listIndex[e.target.parentNode.dataset.id];
      }
    });

    item.addEventListener("dragend", (e) => {
      changeIndex(prevItem, nextItem);
      renderTodosComeplete();
    });
  });
}

// Render Todos All
function renderTodosAll() {
  const listIndex = [];
  const todosComplete = todos.filter((item, index) => {
    if (item.status == true) listIndex.push(index);
    return item.status == true;
  });
  const listDel = $$(".item-delete");
  const listCheck = $$(".item-check");
  const listTodo = $$(".list-item");

  listTodo.forEach((item, index) => {
    item.addEventListener("dragstart", (e) => {
      e.target.style.opacity = 1;
      e.effectAllowed = "move";
      prevItem = index;
    });

    item.addEventListener("dragover", (e) => {
      if (e.target.classList.contains("list-item")) {
        nextItem = e.target.dataset.id;
      } else {
        nextItem = e.target.parentNode.dataset.id;
      }
    });

    item.addEventListener("dragend", (e) => {
      changeIndex(prevItem, nextItem);
      renderTodos(todos);
    });
  });

  listDel.forEach((item, index) =>
    item.addEventListener("click", function () {
      deleteToDo(listIndex[index]);
      renderTodos(todos);
    })
  );

  listCheck.forEach((item, index) =>
    item.addEventListener("click", function () {
      completeToDo(index);
      renderTodos(todos);
    })
  );
}

// Change index
function changeIndex(prev, next) {
  const a = todos[prev];
  todos[prev] = todos[next];
  todos[next] = a;
}

// Remove Active
function removeActive() {
  footItem.forEach((item) => {
    item.classList.remove("active");
  });
}

// Change Theme
function changeTheme() {
  $("body").classList.toggle("light");
}
