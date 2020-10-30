<?php $this->layout('front/layout', ['title'=> config()['site_name']." - Регистрация",'categories' => $categories]); ?>
<div class="my-content">
  <section class="auth-wrap">
    <div class="card">
      <div class="card-header"><h3>Регистрация</h3></div>
      <div class="card-body">
        <form class="auth-form" action="register" method="POST">
          <fieldset>
            <?php echo flash(); ?>
            <div class="form-group">
              <label for="exampleInputEmail1"><i class="fas fa-user"></i> Ваше имя</label>
              <input type="text" class="form-control" id="exampleInputText" aria-describedby="emailHelp"
                     placeholder="" name="username">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1"><i class="fas fa-envelope"></i> Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                     placeholder="" name="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"><i class="fas fa-lock"></i> Пароль</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="" name="password">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword2"><i class="fas fa-lock"></i> Подтвердите проль</label>
              <input type="password" class="form-control" id="exampleInputPassword2" placeholder=""
                     name="password_confirmation">
            </div>
          </fieldset>
          <fieldset class="fieldset-btn">
            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
            <a href="/" class="btn btn-success">Отмена</a>
          </fieldset>
        </form>
        <div class="have-login">
          <p>Уже зарегистрированы? <a href="/login">Войти</a></p>
        </div>
      </div>
    </div>
  </section>
</div>