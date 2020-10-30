$(document).ready(function () {
  //table
  $(function () {
    if (!document.querySelector('#example1')) return;

    $('#example1').DataTable({
      'lengthChange': true,
      'lengthMenu': [4, 5, 10, 25],
      'ordering': true,
    });
    $('#example2').DataTable({
      'paging': false,
      'lengthChange': false,
      'searching': false,
      'ordering': true,
      'info': true,
      'autoWidth': false
    });
  });

  // select
  // if($('.js-example-responsive')) {
  //   $('.js-example-responsive').select2({});
  // }

  // Color picker
  $(function () {
    if (!document.querySelector('#color-picker')) return;
    $('#color-picker').colorpicker();
  });

  $(function () {
    if (!document.querySelector('#editor')) return;

    ClassicEditor
        .create(document.querySelector('#editor'), {
          language: 'ru'
        })
        .then(editor => {
          window.editor = editor;
        })
        .catch(err => {
          console.error(err.stack);
        });
  });

});