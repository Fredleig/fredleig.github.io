<?php $this->layout('front/layout') ?>
<div class="my-content">
  <section class="auth-wrap">
    <div class="card">
      <div class="card-header"><h3>Восстановление пароля</h3></div>
      <div class="card-body">
        <form class="auth-form" action="password-recovery" method="POST">
          <fieldset>
            <?php echo flash(); ?>
            <div class="form-group">
              <label for="exampleInputEmail1"><i class="fas fa-envelope"></i> Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                     placeholder="" name="email">
            </div>
          </fieldset>
          <fieldset class="fieldset-btn">
            <button type="submit" class="btn btn-primary">Отправить</button>
            <a href="login" class="btn btn-success">Отмена</a>
          </fieldset>
        </form>
      </div>
    </div>
  </section>
</div>