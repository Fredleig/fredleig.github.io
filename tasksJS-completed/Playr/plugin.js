class VideoPlayer {
  constructor() {
    this.player = document.querySelector('.player');
    this.video = this.player.querySelector('.viewer');
    this.progress = document.querySelector('.progress');
    this.progressBar = this.progress.querySelector('.progress-filled');
    this.toggle = this.player.querySelector('.toggle');
    this.skipButtuns = this.player.querySelectorAll('[data-skip]');
    this.ranges = this.player.querySelectorAll('.player-slider');
    this.speed = this.player.querySelectorAll('[data-speed]');
    this.mouseDown = false;
  }

  init() {
    // Запускает работу плагина
    this.events();
    this.getDataStatus();
  }

  events() {
    // Все события
    // Play/Pause video
    this.video.addEventListener('click', () => this.togglePlay());
    this.toggle.addEventListener('click', () => this.togglePlay());
    // Изменить звук и скорость
    this.ranges.forEach(currentRanges => currentRanges.addEventListener('change', ev => this.handleRangeUpdate(ev)));
    this.ranges.forEach(currentRanges => currentRanges.addEventListener('input', ev => this.handleRangeUpdate(ev)));
    // Ускорить или замедлить видео
    this.speed.forEach(currentBtnSpeed => currentBtnSpeed.addEventListener('click', ev => this.speedRate(ev)));
    // Прокручивание видео
    this.skipButtuns.forEach(btn => btn.addEventListener('click', ev => this.skip(ev)));
    // Прогресс бар
    this.video.addEventListener('timeupdate', ev => this.progressVideo(ev));
    // Перемотка
    this.progress.addEventListener('click', ev => this.editProgressBar(ev));

    this.progress.addEventListener('mousemove', ev => this.mouseDown && this.editProgressBar(ev));
    this.progress.addEventListener('mousedown', () => this.mouseDown = true);
    this.progress.addEventListener('mouseup', () => this.mouseDown = false);

  }

  togglePlay() {
    // Play/Pause video
    const method = this.video.paused ? 'play' : 'pause';
    this.toggle.textContent = this.video.paused ? '∥' : '►';
    // обращение к ключу объекта
    this.video[method]();
  }

  handleRangeUpdate(ev) {
    // Изменить звук и скорость
    this.video[ev.target.name] = ev.target.value; //-> ev.target = volume или playBackRate
    localStorage.setItem('volume', this.video['volume'])
  }

  speedRate(ev) {
    // Ускорить или замедлить видео
    // -> ev.target = кнопка
    this.speed.forEach(currentBtnSpeed => currentBtnSpeed.removeAttribute('class'));

    this.video.playbackRate = parseFloat(ev.target.dataset.speed);
    ev.target.classList.add('active')
  }

  skip(ev) {
    // Прокручивание видео
    this.video.currentTime += parseFloat(ev.target.dataset.skip);
  }

  progressVideo() {
    // Пргресс бар
    this.progressBar.style.width = `${ (this.video.currentTime / this.video.duration) * 100 }%`;
  }

  editProgressBar(ev) {
      this.video.currentTime = (ev.offsetX / this.progress.offsetWidth) * this.video.duration;
  }

  getDataStatus() {
    // Вернуть значение звука и ползунка (range) из localStorage
    if (localStorage.getItem('volume') !== null) {
      this.video['volume'] = parseFloat(localStorage.getItem('volume'));
      this.ranges[0].value = parseFloat(localStorage.getItem('volume'));
    }
  }

}




const video = new VideoPlayer();
video.init();

console.log(video);