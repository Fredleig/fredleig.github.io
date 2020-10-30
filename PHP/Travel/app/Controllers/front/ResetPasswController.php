<?php
namespace App\Controllers\front;


use App\Components\mail\Notifications;

class ResetPasswController extends Controller
{
  private $notifications;

  public function __construct(Notifications $notifications)
  {
    parent::__construct();
    $this->notifications = $notifications;
  }

  public function recovery_page()
  {
    echo $this->view->render('front/auth/password-recovery');
  }

  public function recovery()
  {
    try {
      $this->auth->forgotPassword($_POST['email'], function ($selector, $token) {
        // send `$selector` and `$token` to the user (e.g. via email)
        $this->notifications->passwordReset($_POST['email'], $selector, $token);
        flash()->success(['На вашу почту было отправленно письмо с дальнейшими инструкциями']);
      });

      // request has been generated
    } catch (\Delight\Auth\InvalidEmailException $e) {
      flash()->error(['Неправильный Email']);
    } catch (\Delight\Auth\EmailNotVerifiedException $e) {
      flash()->error(['Данный Email не подтвержден']);
    } catch (\Delight\Auth\ResetDisabledException $e) {
      flash()->error(['Сброс пароля отключен']);
    } catch (\Delight\Auth\TooManyRequestsException $e) {
      flash()->error(['Cлишком много зпросов, повторите попытку позже']);
    }
    return back();
  }

  public function reset_passw_page()
  {
    if ($this->auth->canResetPassword($_GET['selector'], $_GET['token'])) {

      echo $this->view->render('front/auth/password-reset', ['data' => $_GET]);
    }
  }

  public function change()
  {
    try {
      $this->auth->resetPassword($_POST['selector'], $_POST['token'], $_POST['password']);

      flash()->success(['Пароль успешно изменен.']);
       header('Location: /login'); exit;
    } catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
      flash()->error(['Неверный токен']);
    } catch (\Delight\Auth\TokenExpiredException $e) {
      flash()->error(['Токен просрочен']);
    } catch (\Delight\Auth\ResetDisabledException $e) {
      flash()->error(['Изменение пароля отключено пользователем']);
    } catch (\Delight\Auth\InvalidPasswordException $e) {
      flash()->error(['Введите пароль']);
    } catch (\Delight\Auth\TooManyRequestsException $e) {
      flash()->error(['Превышен лимит.']);
    }
    return back();
  }
}
