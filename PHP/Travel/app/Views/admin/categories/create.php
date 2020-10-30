<?= $this->layout('admin/layout', ['title' => config()['site_name'].'Admin - Добавить категорию']); ?>

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
              <h2 class="box-title">Добавить категорию</h2>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="col-md-6">
                <form action="/admin/categories/add" method="post" enctype="multipart/form-data">
                  <fieldset class="fieldset-wrap">
                    <fieldset class="fieldset-lvl2">
                      <legend>Категория</legend>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Название</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" name="categories">
                      </div>

                    </fieldset>
                    <fieldset class="fieldset-lvl2">
                      <legend>Баннер</legend>

                      <div class="form-group">
                        <label for="editor">Описание</label>
                        <textarea name="text_banner" id="editor"></textarea>
                      </div>

                      <div class="form-group">
                        <label for="exampleInputColor">Цвет контейнера с текстом</label>
                        <div id="color-picker" class="input-group colorpicker-component">
                          <input type="text" value="rgba(255, 255, 255, .4)" class="form-control" name="color_banner">
                          <span class="input-group-addon"><i></i></span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="exampleInputImage">Изображение</label>
                        <input type="file" id="exampleInputImage" name="image">
                      </div>

                      <div class="preview-img">
                        <img src="/img/boxed-bg.png" alt="Image preview...">
                      </div>
                    </fieldset>

                    <div class="form-group">
                      <button class="btn btn-success" type="submit">Добавить</button>
                      <button class="btn btn-primary" type="button"  onclick="history.back();">Отмена</button>
                    </div>
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
