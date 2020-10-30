//* Активное меню
(function activeMenu() {
  let url = window.location.pathname;
  let tabs = document.querySelectorAll('.navbar-nav a');

  tabs.forEach(value => {
    let href = value.getAttribute('href');

    if (url !== '/' && href.includes(url)) {
      console.log(value);
      value.classList.add('active');
    }
  });
})();
