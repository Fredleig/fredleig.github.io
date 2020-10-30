<?php

namespace App\Controllers\front;
class LoginController extends Controller
{
  public function login_page()
  {
    $categories = $this->database->getArrayCol('categories', ['label', 'categories']);
    echo $this->view->render('front/auth/login',['categories' => $categories]);
  }

  public function login()
  {
    try {
      $rememberDuration = null;

      if (isset($_POST['remember'])) {
        // Оставаться под своим логином в течении года
        $rememberDuration = (int) (60 * 60 * 24 * 365.25);
      }

      $this->auth->login($_POST['email'], $_POST['password'], $rememberDuration);

      header('Location: /'); exit;
    }
    catch (\Delight\Auth\InvalidEmailException $e) {
      flash()->error(['Не правильный Email']);
    }
    catch (\Delight\Auth\InvalidPasswordException $e) {
      flash()->error(['Не правильный пароль']);
    }
    catch (\Delight\Auth\EmailNotVerifiedException $e) {
      flash()->error(['Email не подтвержден']);
    }
    catch (\Delight\Auth\TooManyRequestsException $e) {
      flash()->error(['Превышено колличество запросов']);
    }

    return back();
  }

  public function logout()
  {
    $this->auth->logOut();
    header('Location: /'); exit;
  }

}



