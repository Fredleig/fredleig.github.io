<?php $this->layout('admin/layout', ['title' => config()['site_name'].'Admin']); ?>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> Привет! :)</h1>

    <br>
    <h1>
      <small>Данный сайт и админка сделаны в учебных целях. Здесь Вы можете вносить любые изменения, <br>а так же
        проверить его работоспособнсоть и функционал
      </small>
    </h1>
    <?php echo flash(); ?>
  </section>

  <!-- Main content -->
  <section class="content container-fluid">

    <!--------------------------
      | Your Page Content Here |
      -------------------------->

  </section>
  <!-- /.content -->
</div>
<!-- /.content-wrapper -->