<?php

namespace App\Components\mail;

use App\Components\Database;
use Delight\Auth\Auth;

class RegisterComponent
{
  private $auth;
  private $database;
  private $notifications;

  public function __construct(Auth $auth, Database $database, Notifications $notifications)
  {
    $this->auth = $auth;
    $this->database = $database;
    $this->notifications = $notifications;
  }

  public function make($email, $password, $username)
  {
    $userId = $this->auth->register($email, $password, $username, function ($selector, $token) use ($email) {
      // send `$selector` and `$token` to the user (e.g. via email)
      $this->notifications->emailWasChanged($email, $selector, $token);
    });
    $data = ['roles_mask' => Roles::USER, 'avatar' => 'user.jpg', 'date' => get_date()];
    $this->database->update('users', $userId, $data);

    return $userId;
  }

  public function verify($selector, $token)
  {
    return $this->auth->confirmEmail($selector, $token);
  }

  public function re_confirmation($email)
  {
    $this->auth->resendConfirmationForEmail($email, function ($selector, $token) use ($email) {
      $this->notifications->emailWasChanged($email, $selector, $token);
    });
  }

}