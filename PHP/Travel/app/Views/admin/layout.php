<!DOCTYPE html>

<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?= $title; ?></title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <meta property="og:image" content="path/to/image.jpg">
  <link rel="shortcut icon" type="image/png" href="/img/favicon.png">

  <link rel="stylesheet" href="/css/admin/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/css/admin/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="/css/admin/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/css/admin/AdminLTE.min.css">

  <link rel="stylesheet" href="/css/admin/skin-blue.min.css">
  <link rel="stylesheet" href="/css/admin/dataTables.bootstrap.min.css">
  <link rel="stylesheet" href="/css/admin/admin_main.css">

  <!-- select  -->
  <link rel="stylesheet" href="/css/admin/select2.css">
  <!-- color picker  -->
  <link rel="stylesheet" href="/css/admin/bootstrap-colorpicker.min.css">

  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
  <?= $this->insert('admin/partials/menu'); ?>
  <?= $this->section('content') ?>
  <?= $this->insert('admin/partials/footer'); ?>
</div>
<!-- REQUIRED JS SCRIPTS -->
<div class="scripts">
  <!-- jQuery 3 -->
  <script src="/js/admin/adminlte/jquery.min.js"></script>
  <!-- Bootstrap 3.3.7 -->
  <script src="/js/admin/adminlte/bootstrap.min.js"></script>
  <!-- AdminLTE App -->
  <script src="/js/admin/adminlte/adminlte.min.js"></script>
  <script src="/js/admin/dataTables/jquery.dataTables.min.js"></script>
  <script src="/js/admin/dataTables/dataTables.bootstrap.min.js"></script>

  <!-- Optionally, you can add Slimscroll and FastClick plugins.-->
  <script src="/js/admin/adminlte/jquery.slimscroll.min.js"></script>
  <script src="/js/admin/adminlte/fastclick.js"></script>
  <script src="/js/admin/ckeditor/ckeditor.js"></script>
  <script src="/js/admin/ckeditor/ru.js"></script>
  <!-- Select -->
  <script src="/js/admin/select2/select2.full.min.js"></script>
  <script src="/js/admin/select2/select2.min.js"></script>
  <!-- color picker-->
  <script src="/js/admin/bootstrap-colorpicker/bootstrap-colorpicker.min.js"></script>
  <!-- My -->
  <script src="/js/admin/configPlugins.js"></script>
  <script src="/js/admin/myRating.js"></script>
  <script src="/js/admin/main.js"></script>
</div>
</body>
</html>