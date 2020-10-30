<?php $this->layout('front/layout') ?>

<div class="my-content">
  <section class="auth-wrap">
    <div class="card">
      <div class="card-header"><h3>Переотправка письма<br>для подтверждения почты</h3></div>
      <div class="card-body">
        <form class="auth-form" action="email-verification/re_confirmation" method="POST">
          <fieldset>
            <?php echo flash(); ?>
            <div class="form-group">
              <label for="exampleInputEmail1"><i class="fas fa-envelope"></i> Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                     placeholder="" name="email">
            </div>
          <fieldset class="fieldset-btn">
            <button type="submit" class="btn btn-primary">Отправить</button>
            <a href="/" class="btn btn-success">Отмена</a>
          </fieldset>
        </form>
        <div class="have-login password-recovery">
          <p>Нет аккаунта? <a href="registration">Регистрация</a></p>
          <p>Забыли пароль? <a href="password-recovery">Восстановление пароля</a></p>
        </div>
      </div>
    </div>
  </section>
</div>