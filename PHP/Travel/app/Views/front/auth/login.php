<?php $this->layout('front/layout', ['title'=> config()['site_name'].' - Вход', 'categories' => $categories]) ?>
<div class="my-content">
  <section class="auth-wrap">
    <div class="card">
      <div class="card-header"><h3>Вход в админку</h3></div>
      <div class="card-body">
        <form class="auth-form" action="login/login_action" method="POST">
          <fieldset>
            <?php echo flash(); ?>
            <div class="form-group">
              <label for="exampleInputEmail1"><i class="fas fa-envelope"></i> Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                     placeholder="" name="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"><i class="fas fa-lock"></i> Пароль</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="" name="password">
              <label class="checkbox">
                <input type="checkbox" name="remember">Запомнить меня
              </label>
            </div>
          </fieldset>
          <fieldset class="fieldset-btn">
            <button type="submit" class="btn btn-primary">Войти</button>
            <a href="/" class="btn btn-success">Отмена</a>
          </fieldset>
        </form>
        <div class="have-login password-recovery">
          <p>Забыли пароль? <a href="password-recovery">Восстановление пароля</a></p>
          <p>Не пришло письмо подтверждения? <a href="email-verification">Переотправить</a></p>
        </div>
      </div>
    </div>
  </section>
</div>