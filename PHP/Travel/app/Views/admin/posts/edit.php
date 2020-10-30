<?= $this->layout('admin/layout', ['title'=> config()['site_name'].'Admin - Редактировать запись']); ?>
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
            <?php echo flash(); ?>
            <div class="box-header">
              <h2 class="box-title">Изменить запись</h2>
            </div>

            <!-- /.box-header -->
            <div class="box-body">
              <div class="col-md-6">
                <form action="/admin/posts/edit/<?= $post['one_id']; ?>" method="post" enctype="multipart/form-data">
                  <fieldset class="fieldset-wrap">
                    <dl>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Название</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" name="title"
                           value="<?= $post['one_title']; ?>">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputCity1">Город</label>
                    <input type="text" class="form-control" id="exampleInputCity1" name="city" value="<?= $post['one_city']; ?>">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputCity1">Отель</label>
                    <input type="text" class="form-control" id="exampleInputCity1" name="hotel" value="<?= $post['one_hotel']; ?>">
                    <div class="rating">
                      <i class="fa fa-fw fa-star-o"></i>
                      <i class="fa fa-fw fa-star-o"></i>
                      <i class="fa fa-fw fa-star-o"></i>
                      <i class="fa fa-fw fa-star-o"></i>
                      <i class="fa fa-fw fa-star-o"></i>
                      <input type="hidden" class="form-control" id="exampleInputRating" name="rating" value="<?= $post['one_rating']; ?>">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputNights">Колличество ночей</label>
                    <input type="number" class="form-control" id="exampleInputNights" name="num_nights" value="<?= (int)$post['one_num_nights']; ?>">
                  </div>

                  <div class="form-group">
                    <label>Категория</label>
                    <select class="form-control" style="width: 100%;" tabindex="-1"
                            aria-hidden="true" name="categories_id">
                      <?php foreach ($categories as $category): ?>
                        <option
                            <?php if ($category['id'] == $post['one_categories_id']): ?>selected<?php endif; ?>
                            value="<?= $category['id']; ?>"><?= $category['categories']; ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="editor">Описание</label>
                    <textarea name="content" id="editor"><?= $post['one_content']; ?></textarea>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputImage">Изображение</label>
                    <input type="file" id="exampleInputImage" name="image">
                    <div class="preview-img">
                      <img src="<?= get_image($post['one_image']); ?>" alt="Image preview">
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-success" type="submit">Изменить</button>
                    <button class="btn btn-primary" type="button"  onclick="history.back();">Отмена</button>
                  </div>
                    </dl>
                  </fieldset>
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
