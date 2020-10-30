<?= $this->layout('admin/layout', ['title'=> config()['site_name'].'Admin - Пользователи']); ?>
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
              <h2 class="box-title">Все пользователи</h2>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <a href="/admin/users/create" class="btn btn-success btn-lg">Добавить</a> <br> <br>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>id</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Роль</th>
                  <th>Дата регистрации</th>
                  <th>Аватар</th>
                  <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach($users as $user):?>
                  <tr>
                    <td><?= $user['id'];?></td>
                    <td><?= $user['username'];?></td>
                    <td><?= $user['email'];?></td>
                    <td><?= getRole($user['roles_mask']);?></td>
                    <td><?= $user['date'];?></td>
                    <td><img src="<?= get_avatar($user['avatar'])?>" width="200"></td>
                    <td>
                      <a href="/admin/users/profile/<?= $user['id'];?>" class="btn btn-warning">
                        <i class="fa fa-pencil"></i>
                      </a>
                      <a href="/admin/users/user_remove/<?= $user['id'];?>" class="btn btn-danger" onclick="return confirm('Вы уверены?');">
                        <i class="fa fa-remove"></i>
                      </a>
                    </td>
                  </tr>
                <?php endforeach;?>

                </tbody>
                <tfoot>
                <tr>
                  <th>id</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Роль</th>
                  <th>Дата регистрации</th>
                  <th>Аватар</th>
                  <th>Действия</th>
                </tr>
                </tfoot>
              </table>
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
