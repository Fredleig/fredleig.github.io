<?php $user = get_user_info(); ?>

<!-- Main Header -->
  <header class="main-header">

    <!-- Logo -->
    <a href="/admin" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>T</b>LA</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b><?= config()['site_name'] ;?></b>Admin</span>
    </a>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <!-- The user image in the navbar-->
              <img src="<?= get_avatar($user['avatar'])?>" class="user-image" alt="User Image">
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs"><?= $user['name']; ?></span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img src="<?= get_avatar($user['avatar'])?>" class="img-circle" alt="User Image">
                <p>
                  <?= $user['name'];?> - <?= $user['role']; ?>
                  <small>Зарегистрирован: <?= $user['date'];?></small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="/admin/users/profile/<?= $user['id']; ?>" class="btn btn-default btn-flat">Профиль</a>
                </div>
                <div class="pull-right">
                  <a href="/logout" class="btn btn-default btn-flat">Выход</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <ul class="sidebar-menu" data-widget="tree">
        <li><a href="/"><i class="fa fa-home"></i> <span>Перейти на страницу сайта</span></a></li>
      </ul>

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">Основное меню</li>
        <!-- Optionally, you can add icons to the links -->
        <li><a href="/admin/posts"><i class="fa fa-file-text"></i> <span>Записи</span></a></li>
        <li><a href="/admin/categories"><i class="fa fa-th-large"></i> <span>Категории</span></a></li>
        <li><a href="/admin/users"><i class="fa fa-users"></i> <span>Пользователи</span></a></li>

      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>