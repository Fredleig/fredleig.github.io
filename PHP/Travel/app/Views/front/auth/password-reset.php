<?php $this->layout('front/layout') ?>
<div class="my-content">
  <section class="auth-wrap">
    <div class="card">
      <div class="card-header"><h3>Введите новый пароль</h3></div>
      <div class="card-body">
        <form class="auth-form" action="/password-recovery/change" method="POST">
          <fieldset>
            <?php echo flash(); ?>
            <div class="form-group">
              <input type="hidden" name="selector" value="<?= $data['selector'];?>">
              <input type="hidden" name="token" value="<?= $data['token'];?>">
              <label for="exampleInputEmail1"><i class="fas fa-lock"></i> Новый пароль</label>
              <input type="password" class="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp"
                     placeholder="" name="password">
            </div>
          </fieldset>
          <fieldset class="fieldset-btn">
            <button type="submit" class="btn btn-primary">Отправить</button>
          </fieldset>
        </form>
      </div>
    </div>
  </section>
</div>