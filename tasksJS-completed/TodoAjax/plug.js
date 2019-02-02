
let ul = document.getElementsByClassName('list-group')[0];
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let btnClearList = document.querySelector('.clear-btn');

// Генерация рандомного id
function generateId() {
  let id = '';
  let words = '0123456789qwertyuiopasdfghjklzxcvbnm';

  for (let i = 0; i < 5; i++) {
    let position = Math.floor(Math.random() * words.length);
    id += words[position];
  }
  return id
}

function genetareList(tasksArray) {

  clearList();

  for (let i = 0; i < tasksArray.length; i++) {
    let li = listTemplate(tasksArray[i]); //? let li = Результат функции listTemplate - "return li" (колбек)
    ul.appendChild(li);
  }
  console.log(tasksArray);
}

function listTemplate(task) {

  // Создаются <li> 
  let li = document.createElement('li');
  li.className = 'list-group-item d-flex align-item-center';
  li.setAttribute('data-id', task.id);
  let span = document.createElement('span');
  span.textContent = task.title; //? task = tasksArray[i] (колбек)

  if (task.completed) {
    li.classList.add('bg-success');
  }

  // Создается иконка "Корзина"
  let iDelete = document.createElement('i');
  iDelete.className = 'fas fa-trash-alt delete-item ml-4';
  // Создается иконка "Редактировать"
  let iEdit = document.createElement('i');
  iEdit.className = 'fas fa-edit edit-item ml-auto';

  // Добавляет "Корзина" и "Редактировать" в <li>
  li.appendChild(span);
  li.appendChild(iEdit);
  li.appendChild(iDelete);

  return li;

}

function clearList() {
  ul.innerHTML = '';
}

// Добавить Новую задачу
const addNewTask = {

  id: generateId(),
  title: '',

  getObjTask() {
    let task = {
      id: addNewTask.id,
      title: addNewTask.title
    };
    return this
  },

  addTask() {
    return ul.insertAdjacentElement('afterbegin', listTemplate(this.getObjTask())); //? 1 аргумент - позиция куда вставить (всего их 4); 2 арг. - текст
  }

};

// Удаление задачи
function deleteListItem(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break
    }
  }
  // Уведомление
  addAlert(function (div) {  //? колбек
    div.className = 'alert alert-danger';
    div.textContent = 'Задача удалена успешно!';
  });
}


// Событие Редактирование и удаление
ul.addEventListener('click', function (e) {

  //? выполняется функция если нажат элемент с классом 'delete-item'(корзина)
  if (e.target.classList.contains('delete-item')) {
    let parent = e.target.closest('li');
    let id = parent.dataset.id;
    delTaskServer(id, e.target, parent);
    // Уведомление
    alertTaskZero();

    //? если нажата иконка "редактирование"
  } else if (e.target.classList.contains('edit-item')) {
    e.target.classList.toggle('fa-save');
    let id = e.target.closest('li').dataset.id;
    let span = e.target.closest('li').querySelector('span');

    if (e.target.classList.contains('fa-save')) {
      span.setAttribute('contenteditable', true); //? атрибут "contenteditable" делает элемент доступным для редактирования (htmlbook.ru)
      span.focus();
    } else {
      updateTaskServer(id, span, span.textContent, e.target);
    }
  }
});


// Добавлеение задач и подсветки если текст не введен
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!inputText.value) {
    inputText.classList.add('is-invalid')
  } else {
    addNewTask.title = inputText.value; //? inputText.value - значение формы (т.е текст)
    addTaskServer();
    form.reset();
  }
});

// Удаление error подсведки в инпуте когда введен текст
inputText.addEventListener('keyup', function () {
  if (inputText.value) {
    inputText.classList.remove('is-invalid');
  }
});

//! Уведомления
function addAlert(alert) {

  clearAlert();

  let form = document.body.querySelector('.form-group');
  let div = document.createElement('div');
  form.insertAdjacentElement('beforebegin', div);

  alert(div);

  setTimeout(function () {
    div.remove();
  }, 2000);
}

// Очищение Уведомлений
function clearAlert() {

  let alert = document.body.querySelector('.alert');
  if (alert) {
    alert.remove();
  }
}

// Очищает весь список задач при нажатии на кнопку.
btnClearList.onclick = function () {
  clearList();
  alertTaskZero();
  localStorage.clear()
};


// Уведомление если список задач пуст
function alertTaskZero() {
  clearAlert();
  if (ul.childElementCount === 0) {

    let form = document.body.querySelector('.task-block');
    let div = document.createElement('div');
    div.className = 'alert alert-info';
    div.textContent = 'Список задач пуст';

    form.insertAdjacentElement('afterbegin', div);

  }
}

//! Запросы на сервер
// Получить все задачи
(function () {
  ajax.send({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    //? res = xhr.responseText; см. в модуле
    success: function (res) {
      //Сгенирировать список задач
      genetareList(JSON.parse(res));
      alertTaskZero();
    },
    error: function (err) {
      console.log(err);
    }
  });
})();

// Отправить новую задачу
function addTaskServer() {
  ajax.send({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: JSON.stringify(addNewTask.getObjTask()),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    success: function (res) {
      // Добавить задачу
      addNewTask.addTask();
      console.log(JSON.parse(res));
      // Уведомление
      addAlert(div => {
        div.className = 'alert alert-success';
        div.textContent = 'Задача добавлена успешно!';
      });

    },
    error: function (err) {
      console.log(err);
    }
  });
}
// Обновление задачи
function updateTaskServer(id, edditText, title, icon) {
  ajax.send({
    method: 'PUT',
    url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    data: JSON.stringify({
      id: id,
      title: title
    }),

    success: function (res) {
      console.log(JSON.parse(res));

      edditText.setAttribute('contenteditable', false);
      edditText.blur();
      // Уведомление
      addAlert(div => {
        div.className = 'alert alert-success';
        div.textContent = 'Редактирование прошло успешно';
      });
    },

    error: function (err) {

      icon.classList.add('fa-save');
      edditText.focus();

      addAlert(div => {  //? колбек
        div.className = 'alert alert-danger';
        div.textContent = `Операция не выполнена. ${err.errorText + ' ' + err.code}`;
      });

      console.log(err);
    },
  });
}
// Удаление
function delTaskServer(id, taskTarget, parent) {

  ajax.send({
    method: 'DELETE',
    url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    //? res = xhr.responseText; см. в модуле
    success: function (res) {

      parent.remove();
      console.log(JSON.parse(res))
    },
    error: function (err) {

      addAlert(div => {  //? колбек
        div.className = 'alert alert-danger';
        div.textContent = `Операция не выполнена. ${err.errorText + ' ' + err.code}`;

        console.log(err);
      });
    }
  });
}


