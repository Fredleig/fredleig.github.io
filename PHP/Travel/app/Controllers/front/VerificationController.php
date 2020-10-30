<?php

namespace App\Controllers\front;

use App\Components\mail\Notifications;

class VerificationController extends Controller
{
  private $notifications;

  public function __construct(Notifications $notifications)
  {
    parent::__construct();
    $this->notifications = $notifications;
  }

  public function showForm()
  {
    echo $this->view->render('front/auth/verification-form');
  }

  public function verify()
  {
    try {
      $this->auth->confirmEmail($_GET['selector'], $_GET['token']);

      flash()->success(['Ваш email подвержден! Грац :)']);
    } catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
      flash()->error(['Неверный токен']);
    } catch (\Delight\Auth\TokenExpiredException $e) {
      flash()->error(['Неверный испортился']);
    } catch (\Delight\Auth\UserAlreadyExistsException $e) {
      flash()->error(['Email уже существует']);
    } catch (\Delight\Auth\TooManyRequestsException $e) {
      flash()->error(['Куда ломишься!??!']);
    }

    header('Location: login');
    exit;

  }
}