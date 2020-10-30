<?php

namespace App\Controllers\front;


use App\Components\mail\RegisterComponent;
use Respect\Validation\Exceptions\ValidationException;
use Respect\Validation\Validator as v;


class RegisterController extends Controller
{

  private $registration;

  public function __construct(RegisterComponent $registration)
  {
    parent::__construct();
    $this->registration = $registration;
  }

  public function register_page()
  {
    $categories = $this->database->getArrayCol('categories', ['label', 'categories']);
    echo $this->view->render('front/auth/register', ['categories'=> $categories]);
  }

  public function register()
  {
    $this->validate();
    try {
      $this->registration->make(
          $_POST['email'],
          $_POST['password'],
          $_POST['username']
      );
      flash()->success(['На вашу почту ' . $_POST['email'] . ' был отправлен код с подтверждением.']);
      header('Location: login');
      exit;

    } catch (\Delight\Auth\InvalidEmailException $e) {
      flash()->error(['Неправильный email']);
    } catch (\Delight\Auth\InvalidPasswordException $e) {
      flash()->error(['Неправильный пароль']);
    } catch (\Delight\Auth\UserAlreadyExistsException $e) {
      flash()->error(['Пользователь уже существует']);
    } catch (\Delight\Auth\TooManyRequestsException $e) {
      flash()->error(['Превышено колличество запросов']);
    }

    header('Location: registration');
    exit;
  }

  private function validate()
  {
    $validator = v::key('username', v::stringType()->notEmpty())
        ->key('email', v::email())
        ->key('password', v::stringType()->notEmpty())
        ->keyValue('password_confirmation', 'equals', 'password');

    try {
      $validator->assert($_POST);

    } catch (ValidationException $exception) {
      $exception->findMessages($this->getMessages());
      flash()->error($exception->getMessages());

      header('Location: registration');
      exit;
    }
  }

  private function getMessages()
  {
    return [
        'username' => 'Введите имя',
        'email' => 'Неверный формат e-mail',
        'password' => 'Введите пароль',
        'password_confirmation' => 'Пароли не сопадают'
    ];
  }

  // Повторная отправка подтверждения почты
  public function repeat_letter()
  {
    try {
      $this->registration->re_confirmation($_POST['email']);

      flash()->success(['На ваш email было повторно отправленно сообщение']);
    } catch (\Delight\Auth\ConfirmationRequestNotFound $e) {
      flash()->error(['Не найден более ранний запрос, который можно отправить повторно']);
    } catch (\Delight\Auth\TooManyRequestsException $e) {
      flash()->error(['Превышено колличество запросов']);
    }
    header('Location: /login');
    exit;
  }

}