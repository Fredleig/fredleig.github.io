const buttons = document.querySelectorAll('[data-time]');
const form = document.forms['myForm'];
const inputText = form.elements['minutes'];
const stopButtons = document.body.querySelector('.btn-stop');

const timer = ((() => {

  let coutdown,   
      timerDisplay,
      endTime,
      btnStop,
      alarmSound;

  // Инициализация
  function init(settings) {
    timerDisplay = document.querySelector(settings.timeLeftSelector);
    endTime = document.querySelector(settings.timeEndSelector);
    btnStop = document.body.querySelector(settings.timeBtnStop);

    if (settings.alarmSound) {
      alarmSound = new Audio(settings.alarmSound);
    }
    return this
  }

  // Запустить таймер
  function start(seconds) {

    if (!timerDisplay || !endTime) return console.log('Инициализируйте модуль');
    if (!seconds || typeof seconds !== 'number') return console.log('Нет значения seconds');

    // Cброс таймера и аудио
    clearInterval(coutdown);
    alarmSound.pause();
    alarmSound.currentTime = 0;

    btnStop.classList.add('show');

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    // обратный отсчет
    coutdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      let outputAkbar = {
        title: document.title = 'Timer',
        akbar: timerDisplay.textContent = 'Алаху Акбар'
      };

      if (secondsLeft < 0) {
        clearInterval(coutdown);
        playSound();
        return outputAkbar;
      }
      displayTimeLeft(secondsLeft)
    }, 1000);
    return this
  }

  // Отобразить в разметке
  function displayTimeLeft(seconds) {
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const remindetSeconds = seconds % 60;

    let display = `${minutes}:${remindetSeconds < 10 ? '0' : ''}${remindetSeconds}`;
    //  Дни
    if (seconds > 86400) {
      let textDay = declination(day);
      display = day + ' ' + textDay + ', ' + hour + ':' + display
      //  Часы
    } else if (seconds > 3600) {
      display = hour + ':' + display
    }

    document.title = 'Timer: ' + display;
    timerDisplay.textContent = display;
  }

  // Склоенение числетельных
  function declination(day) {
    let indexDay = [2, 0, 1, 1, 1];
    let masDay = ['день', 'дня', 'дней'];
    let textDay = '';

    if (day % 100 > 4 && day % 100 < 20) {
      textDay = masDay[2];
    } else if (day % 10 < 5) {
      textDay = masDay[indexDay[day % 10]];
    } else {
      textDay = masDay[2];
    }
    return textDay
  }

  // Отобразить в разметке конечное временя
  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Таймер до ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  // Прервать
  function stop() {
    // Cброс таймера и аудио
    clearInterval(coutdown);
    alarmSound.pause();
    alarmSound.currentTime = 0;

    timerDisplay.textContent ='';
    endTime.textContent ='';

    btnStop.classList.remove('show');
  }

  // запустить аудио при окончании таймера
  function playSound() {
    alarmSound.play();
  }

  return {
    init,
    start,
    stop
  }

}))();

// Инициализация таймера
timer.init({
  timeLeftSelector: '.display-time-left',
  timeEndSelector: '.display-end-time',
  timeBtnStop: '.btn-stop',
  alarmSound: 'audio/Akbar.mp3'
});

// Запуск таймера при клике
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer.start(seconds);
}

// Вешает обработчик событий на все кнопки
buttons.forEach(buttons => buttons.addEventListener('click', startTimer));

// запустить таймер, для введеных пользователем минут
function formSubmit (e) {
  e.preventDefault();

  const secondForm = inputText.value * 60;

  timer.start(secondForm);
  form.reset();
}

form.addEventListener('submit', formSubmit);

// Кнопка стоп
stopButtons.addEventListener('click', () => timer.stop());
