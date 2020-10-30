(function () {

  let rating = $('.rating');
  let allWidth = rating.width();

  let star;
  let empty = 'fa-star-o';
  let halfFull = 'fa-star-half-full';
  let full = 'fa-star';

  let checkHandler = true;
//-------------------------------------------------------------------------------------------------------------------//

//* Внутренние функции для работы с обработчиками
  const internalWork = (function () {

    // Расчеты
    function calculations(ev, offset) {
      let position = ev.pageX - offset; //? позиция мыши внутри элемента (в пикселях)

      let posPercent = 100 / (allWidth / position); //? сколько процентов составляет "позиция" от "всей ширины" (имя формулы: число от числа = %)
      let numStar = 5 * posPercent / 100; //? находим номер звезды (имя формулы: % от числа = число)
      let result = Math.ceil(numStar * 2) / 2; //? округляем с шагом в 0.5
      return result;
    }

    // анимация при навидение
    function hover($target, classStar) {
      let delClass;
      classStar === halfFull ? delClass = full : delClass = halfFull;
      if ($target.hasClass(full) || $target.hasClass(empty) || $target.hasClass(halfFull)) {
        $target
            .removeClass(empty + ' ' + delClass)
            .addClass(classStar)
            .prevAll()
            .removeClass(empty + ' ' + delClass)
            .addClass(full)
            .end()
            .nextAll()
            .removeClass(halfFull + ' ' + full)
            .addClass(empty)
      }
    }

    // Добавление/Удаление события
    function toggleEventMousemove(inputValue) {
      let input = $('#exampleInputRating');

      if (checkHandler) {
        checkHandler = false;
        input.attr('value', inputValue);
        rating.off('mousemove', handlers.mousemoveHandler);
      } else {
        checkHandler = true;
        input.attr('value', '');
        rating.on('mousemove', handlers.mousemoveHandler);
      }
    }

    return {
      calculations,
      hover,
      toggleEventMousemove
    }

  }());
//-------------------------------------------------------------------------------------------------------------------//

//* Обработчки для событий
  const handlers = (function () {

    // движение курсора
    function mousemoveHandler(ev) {
      let offset = $(this).offset().left;
      let $target = $(ev.target);
      let result = internalWork.calculations(ev, offset);

      result % 1 === 0 ? star = 'all_full' : star = 'half_full';

      if (star === 'all_full') {
        internalWork.hover($target, full);

      } else if (star === 'half_full') {
        internalWork.hover($target, halfFull);
      }
    }

    // клик мыши
    function clickHandler(ev) {
      let offset = $(this).offset().left;
      let inputValue = internalWork.calculations(ev, offset);
      internalWork.toggleEventMousemove(inputValue);
    }

    // курсор убран с элемента
    function mouseoutHandler() {
      let stars = rating.find('i');
      if (checkHandler) {
        stars.removeClass(halfFull + ' ' + full).addClass(empty)
      }
    }

    return {
      mousemoveHandler,
      clickHandler,
      mouseoutHandler,
    }

  }());

//-------------------------------------------------------------------------------------------------------------------//
  //* Рейтинг для страницы Edit
  const editPage = (function () {

    function currentNumStar() {
      let star = rating.find('i');
      let inputValue = rating.find('input').val();
      if (inputValue > 0) {

        star.filter(index => index < inputValue).removeClass(empty).addClass(full);

        if (inputValue % 1 !== 0) $(star[Math.floor(+inputValue)]).removeClass(full).addClass(halfFull);

        _removeMouseover();
      }
    }

    function _removeMouseover() {
      checkHandler = false;
      rating.off('mousemove', handlers.mousemoveHandler);
    }

    return {
      currentNumStar
    }
  }());

//-------------------------------------------------------------------------------------------------------------------//
  //* События
  const events = function () {
    rating.on('mousemove', handlers.mousemoveHandler);
    rating.on('click', handlers.clickHandler);
    rating.on('mouseout', handlers.mouseoutHandler);
  };
//-------------------------------------------------------------------------------------------------------------------//

  // Включить плагин
  function startRating() {
    if (document.querySelector('.rating')) events()
  }

  // Включить дополнение для страницы edit
  function startRatingPageEdit() {
    let url = window.location.pathname;

    if (url.indexOf('/admin/posts/edit/') === 0) {
      editPage.currentNumStar();
    }
  }

  startRating();
  startRatingPageEdit();
})(jQuery);

