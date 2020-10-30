<?= $this->layout('admin/layout', ['title'=> config()['site_name'].'Admin - Категории']); ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">

  <!-- Main content -->
  <section class="content container-fluid">

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">КАТЕГОРИИ</h3>
        </div>
        <div class="box-body">
          <div class="">
            <?php echo flash(); ?>
            <div class="box-header">
              <h2 class="box-title">Все категории</h2>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <a href="/admin/categories/create" class="btn btn-success btn-lg">Добавить</a> <br> <br>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>id</th>
                  <th>Название</th>
                  <th>Изображение</th>
                  <th>Дата создания</th>
                  <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($categories as $category): ?>
                  <tr>
                    <td><?= $category['id']; ?></td>
                    <td><?= $category['categories']; ?></td>
                    <td><img src="<?= get_image($category['image']); ?>" alt=""></td>
                    <td><p>Время: <?= $category['time']; ?></p>
                      <p>Дата: <?= $category['date']; ?></p></td>
                    <td>
                      <a href="/admin/categories/edit/<?= $category['id']; ?>" class="btn btn-warning">
                        <i class="fa fa-pencil"></i>
                      </a>
                      <?php if ((int)$category['id'] !== 0 && (int)$category['id'] !== 1): ?>
                        <a href="/admin/categories/delete/<?= $category['id']; ?>" class="btn btn-danger"
                           onclick="return confirm('Вы уверены? Будут удалены все ваши записи связанные с этой категорией!');">
                          <i class="fa fa-remove"></i>
                        </a>
                      <?php endif; ?>
                    </td>
                  </tr>
                <?php endforeach; ?>
                </tbody>
                <tfoot>
                <tr>
                  <th>id</th>
                  <th>Название</th>
                  <th>Изображение</th>
                  <th>Дата создания</th>
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