const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = document.querySelector(".js-toDoInput"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");
let toDos = [];
const toDosLS = "toDos";
let finisheds = [];
const finishedsLS = "finisheds";

function moveItem(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const delBtn = li.querySelector(".delBtn");
  if (btn.innerText === "👍") {
    const pickingToDo = toDos.filter(function (item) {
      return item.id === parseInt(li.id);
    });
    delBtn.click();
    paintToDos(pickingToDo[0].text, finisheds, finishedsLS);
  } else {
    const pickingFinished = finisheds.filter(function (item) {
      return item.id === parseInt(li.id);
    });
    delBtn.click();
    paintToDos(pickingFinished[0].text, toDos, toDosLS);
  }
}

function deleteItem(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const listClass = li.parentElement.className;
  if (listClass === "js-toDoList") {
    toDoList.removeChild(li);
    var list = toDos;
    var listLS = toDosLS;
  } else {
    finishedList.removeChild(li);
    var list = finisheds;
    var listLS = finishedsLS;
  }
  var cleanedItem = list.filter(function (item) {
    return item.id !== parseInt(li.id);
  });
  if (listClass === "js-toDoList") {
    toDos = cleanedItem;
    saveLS(toDos, listLS);
  } else {
    finisheds = cleanedItem;
    saveLS(finisheds, listLS);
  }
}

function saveLS(list, listLS) {
  localStorage.setItem(listLS, JSON.stringify(list));
}
function loadLS() {
  const loadedToDosLS = localStorage.getItem("toDos");
  const loadedFinishedsLS = localStorage.getItem("finisheds");
  if (loadedToDosLS !== null) {
    const parsedtoDos = JSON.parse(loadedToDosLS);
    parsedtoDos.forEach(function (toDo) {
      paintToDos(toDo.text, toDos, toDosLS);
    });
  }
  if (loadedFinishedsLS !== null) {
    const parsedFinisheds = JSON.parse(loadedFinishedsLS);
    parsedFinisheds.forEach(function (finished) {
      paintToDos(finished.text, finisheds, finishedsLS);
    });
  }
}
function paintToDos(text, list, listLS) {
  const li = document.createElement("li");
  const mvBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  if (toDos.length === 0 && finisheds.length === 0) {
    var newId = 1;
  } else if (toDos.length !== 0 && finisheds.length === 0) {
    var newId = toDos[toDos.length - 1].id + 1;
  } else if (toDos.length === 0 && finisheds.length !== 0) {
    var newId = finisheds[finisheds.length - 1].id + 1;
  } else {
    var newId = Math.max(
      toDos[toDos.length - 1].id + 1,
      finisheds[finisheds.length - 1].id + 1
    );
  }
  li.id = newId;
  delBtn.innerText = "❌";
  delBtn.className = "delBtn";
  delBtn.addEventListener("click", deleteItem);
  if (listLS === "toDos") {
    mvBtn.innerText = "👍";
  } else {
    mvBtn.innerText = "👎";
  }
  mvBtn.addEventListener("click", moveItem);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(mvBtn);
  li.appendChild(delBtn);
  if (listLS === "toDos") {
    toDoList.appendChild(li);
  } else {
    finishedList.appendChild(li);
  }
  const objItem = {
    text: text,
    id: newId
  };
  list.push(objItem);
  saveLS(list, listLS);
}
function handleSubmit(event) {
  event.preventDefault();
  const userInput = toDoInput.value;
  paintToDos(userInput, toDos, toDosLS);
}
function init() {
  loadLS();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();