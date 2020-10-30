<?= $this->layout('admin/layout', ['title'=> config()['site_name'].'Admin - Профиль']); ?>

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
        </div>
        <div class="box-body">
          <div class="">
            <?= flash(); ?>
            <div class="box-header">
              <h2 class="box-title">Профиль</h2>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="col-md-6">
                <form action="/admin/users/profile/<?= $user['id']; ?>/update" method="POST"
                      enctype="multipart/form-data">
                  <div class="form-group">
                    <label for="exampleInputUser1">Имя</label>
                    <input type="text" class="form-control" name="username" id="exampleInputUser1"
                           value="<?= $user['username']; ?>">
                  </div>

                  <div class="noEdit">
                    <label>Email</label>
                    <div class="input-noEdit"><?= $user['email']; ?></div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPass1">Текущий Пароль</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPass1">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPass2">Новый Пароль</label>
                    <input type="password" name="new_password" class="form-control" id="exampleInputPass2">
                  </div>
                  <?php if (check_access()): ?>
                    <div class="form-group">
                      <label>Роль</label>
                      <select class="form-control" style="width: 100%;" name="roles_mask">
                        <?php foreach ($roles as $role): ?>
                          <option
                              <?php if ($role['id'] == $user['roles_mask']): ?> selected <?php endif; ?>
                              value="<?= $role['id']; ?>"><?= $role['title']; ?></option>
                        <?php endforeach; ?>
                      </select>
                    </div>
                  <?php endif; ?>
                  <div class="form-group">
                    <label for="exampleInputImage">Аватар</label>
                    <input type="file" id="exampleInputImage" name="image">
                    <br>
                    <div class="preview-img">
                      <img src="<?= get_avatar($user['avatar']); ?>" width="200">
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-warning" type="submit"  onclick="return confirm('Вы уверены что нужно сохранить изменения?');">Изменить</button>
                    <a href="/admin" class="btn btn-primary">Отмена</a>
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
