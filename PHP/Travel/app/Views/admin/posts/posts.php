<?= $this->layout('admin/layout', ['title'=> config()['site_name'].'Admin - Записи']); ?>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">

  <!-- Main content -->
  <section class="content container-fluid">

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">ЗАПИСИ</h3>
        </div>
        <div class="box-body">
          <div class="">
            <div class="box-header">
              <h2 class="box-title">Все записи</h2>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <!--  Functions  -->
              <div class="functions">

                <div class="left-func">
                  <a href="/admin/posts/create" class="btn btn-success btn-lg">Добавить</a>
                </div>

                <div class="right-func">
                  <form action="/admin/posts" method="POST">
                    <div class="form-group">
                      <label for="exampleSelect2">Категории</label>
                      <select name="filter_categories" class="form-control" id="exampleSelect2">
                        <option value="-1">Все записи</option>
                        <?php foreach ($categories as $category): ?>
                          <option
                              <?php if ($_SESSION['filter_categories'] == $category['id']): ?>selected<?php endif; ?>
                              value="<?= $category['id']; ?>"><?= $category['categories']; ?>
                          </option>
                        <?php endforeach; ?>
                      </select>
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn btn-lg">Показать</button>
                    </div>

                  </form>
                </div>
              </div>
              <!--  /Functions  -->
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>id</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Изображение</th>
                  <th>Дата создания</th>
                  <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($posts as $post): ?>
                  <tr>
                    <td><?= $post['one_id']; ?></td>
                    <td><?= $post['one_title']; ?></td>
                    <td><?= $post['two_categories']; ?></td>
                    <td><img src="<?= get_image($post['one_image']); ?>" alt=""></td>
                    <td><p>Время: <?= $post['one_time']; ?></p>
                      <p>Дата: <?= $post['one_date']; ?></p></td>
                    <td>
                      <a href="/admin/posts/edit/<?= $post['one_id']; ?>" class="btn btn-warning">
                        <i class="fa fa-pencil"></i>
                      </a>
                      <a href="/admin/posts/delete/<?= $post['one_id']; ?>" class="btn btn-danger"
                         onclick="return confirm('Вы уверены?');">
                        <i class="fa fa-remove"></i>
                      </a>
                    </td>
                  </tr>
                <?php endforeach; ?>
                </tbody>
                <tfoot>
                <tr>
                  <th>id</th>
                  <th>Название</th>
                  <th>Категория</th>
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