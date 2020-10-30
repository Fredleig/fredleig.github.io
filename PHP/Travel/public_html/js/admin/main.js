(function () {

  //* Активное меню
  function activeMenu() {
    let url = window.location.pathname;
    let tabs = $('.sidebar-menu a');

    tabs.each(function () {
      let link = $(this);
      if (link.attr('href') !== '/' && url.indexOf(link.attr('href')) === 0) {
        link.closest('li').addClass('active');
      }
    })

  }

  activeMenu();

  //* Превью изображений перед загрузкой (https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL на ванильном JS)
  function previewFile() {

    if ($('#exampleInputImage')) {
      $('#exampleInputImage').on('change', handler);
    }

    function handler() {
      let file = $(this)[0].files[0];

      if (!file.type.match('image')) {
        alert('Не допустимый формат файла');
        return;
      }

      let reader = new FileReader();

      reader.addEventListener("load", () => {
        $('.preview-img img').attr('src', reader.result);
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  previewFile();
  //* Конец - Превью
})(jQuery);
