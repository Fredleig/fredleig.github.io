<?= $this->layout('admin/layout', ['title' => config()['site_name'].'Admin - Редактировать категорию']); ?>


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
            <div class="box-header">
              <h2 class="box-title">Изменить категорию</h2>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="col-md-6">
                <?php echo flash(); ?>
                <form action="/admin/categories/edit/<?= $category['id']; ?>" method="POST"
                      enctype="multipart/form-data">
                  <fieldset class="fieldset-wrap">
                    <dl>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Название</label>
                        <input type="text" class="form-control" name="categories" id="exampleInputEmail1"
                               value="<?= $category['categories']; ?>">
                      </div>

                      <fieldset class="fieldset-lvl2">
                        <legend>Баннер</legend>

                        <div class="form-group">
                          <label for="editor">Описание</label>
                          <textarea name="text_banner" id="editor"><?= $category['text_banner']; ?></textarea>
                        </div>

                        <div class="form-group">
                          <label for="exampleInputColor">Цвет контейнера с текстом</label>
                          <div id="color-picker" class="input-group colorpicker-component">
                            <input type="text" value="<?= $category['color_banner']; ?>" class="form-control" name="color_banner">
                            <span class="input-group-addon"><i></i></span>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="exampleInputImage">Изображение</label>
                          <input type="file" id="exampleInputImage" name="image">
                          <br>
                          <div class="preview-img">
                            <img src="<?= get_image($category['image']); ?>">
                          </div>
                        </div>
                      </fieldset>


                      <div class="form-group">
                        <button class="btn btn-warning" type="submit">Изменить</button>
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