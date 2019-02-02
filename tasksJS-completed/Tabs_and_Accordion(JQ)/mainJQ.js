(function ($) {

  // todo: Табы
  function tabsMenu() {

    const navTab = $('.nav-tabs');
    const tabContent = $('.tab-pane');

    function onClick(ev) {
      ev.preventDefault();

      let li = $('.nav-tabs li');
      let tabContentShow = $(this.firstChild).attr('href');

      if (!$(this).hasClass('active')) {
        li.removeAttr('class');
        // Скрываем "tabContent"
        // Что бы анимация, при спаме кнопки, не была в очереди - удаляю обработчики событий
        navTab.off('click', 'li', onClick);
        tabContent.fadeOut(200, 'linear', () => $(this).removeClass('active')).delay(500);
        // Показываем
        $(tabContentShow).fadeIn(200, 'linear', () => {
          navTab.on('click', 'li', onClick);
          $(this).addClass('active');
        });
      }
    }

    navTab.on('click', 'li', onClick)
  }
  tabsMenu();

  // todo: Аккордион
  function accordion() {
    const acdn = $('.accordion');


    function onClickAc (ev) {
      let currentContent = $(this.nextElementSibling);
      let curParentActive = $(this).closest('.accordion-item');
      let content = $('.accordion-body.card-body');
      let parAct = $('.accordion-item.active');

      // если кликнул не по активной вкладке
      if (!curParentActive.hasClass('active'))  {
        content.slideUp(350);
        currentContent.slideDown(350);

        parAct.removeClass('active');
        curParentActive.addClass('active');
      //  если по активной
      } else {
        curParentActive.toggleClass('active');
        currentContent.slideToggle(350);
      }


    }
    acdn.on('click', '.accordion-header.card-header', onClickAc)
  }
  accordion();

  // todo: Плавный скролл по якорю
  function referenceScroll() {
    const scrollBtn = $('[data-scroll]');

    function onClickSk(ev) {

      const target = $(this).attr('data-scroll');
      const dist = $(target).offset().top;
      // анимировать скролл
      $('html, body').animate({scrollTop: dist}, 1000, 'swing');
    }
    scrollBtn.on('click', onClickSk);
  }
  referenceScroll();

  //todo: Всплывающее меню при скроле
  function fScrollMenuJQ() {
    const topBar = $('header');
    const wrapTab = $('.wrap-services-tab');
    const windowHeight = $(window).height();
    const headerHeight = topBar.outerHeight();

    function onScroll(ev) {
      let pos = $(window).scrollTop();

      if (pos > headerHeight) {
        topBar.css({
          'position': 'fixed',
          'top': '-75px',
          'width':'100%',
        });
        wrapTab.css({
          marginTop: 75
        });
      }

      if (pos > windowHeight - 100) {
        topBar.css({
          'top': '0',
          'transition': 'top .3s ease-out'
        });
      }
      if (pos < headerHeight) {
        topBar.css({
          'position': 'relative',
          'top': '0',
          'transition': 'none'
        });
        wrapTab.css({
          marginTop: 0
        });
      }
    }

    $(window).on('scroll', onScroll)
  }

  fScrollMenuJQ();

})(jQuery);

