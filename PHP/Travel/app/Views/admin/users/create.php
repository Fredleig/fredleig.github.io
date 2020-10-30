<?= $this->layout('admin/layout', ['title'=> config()['site_name'].'Admin - Добавить пользователя']); ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">

  <!-- Main content -->
  <section class="content container-fluid">

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">ПОЛЬЗОВАТЕЛИ</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                    title="Collapse">
              <i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
              <i class="fa fa-times"></i></button>
          </div>
        </div>
        <div class="box-body">
          <div class="">
            <div class="box-header">
              <h2 class="box-title">Добавить пользователя</h2>
            </div>

            <!-- /.box-header -->
            <div class="box-body">
              <div class="col-md-6">
                <?= flash(); ?>

                <form action="/admin/users/add" method="post" enctype="multipart/form-data">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Имя</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" name="username">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name="email">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Пароль</label>
                    <input type="password" class="form-control" id="exampleInputEmail1" name="password">
                  </div>

                  <div class="form-group">
                    <label>Роль</label>
                    <select class="form-control" style="width: 100%;" name="roles_mask">
                      <?php foreach ($roles as $role): ?>
                        <option value="<?= $role['id']; ?>"><?= $role['title']; ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputImage">Аватарка</label>
                    <input type="file" id="exampleInputImage" name="image">
                    <div class="preview-img">
                      <img src="/img/boxed-bg.png" alt="Image preview...">
                    </div>
                  </div>

                  <div class="form-group">
                    <button class="btn btn-success" type="submit">Добавить</button>
                    <button class="btn btn-primary" type="button"  onclick="history.back();">Отмена</button>
                  </div>
                </form>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          По вопросам к главному администратору.
        </div>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->

  </section>
  <!-- /.content -->
</div>
<!-- /.content-wrapper -->
