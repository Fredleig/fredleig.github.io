<?php

namespace App\Controllers\admin;

use App\Components\ImgManager;
use App\Components\mail\Roles;
use Delight\Auth\Role;


class UserController extends Controller
{
  private $imageManager;

  public function __construct(ImgManager $imageManager)
  {
    parent::__construct();
    $this->imageManager = $imageManager;
  }

  public function page_users()
  {
    if ($this->auth->hasRole(Role::ADMIN)) {
      $users = $this->database->getArrayCol('users');
      echo $this->view->render('admin/users/users', ['users' => $users]);
    } else {
      echo $this->view->render('admin/errors/no_access');
    }
  }

  public function create_user_page()
  {
    if ($this->auth->hasRole(Role::ADMIN)) {
      $roles = Roles::getRoles();
      echo $this->view->render('admin/users/create', ['roles' => $roles]);
    } else {
      echo $this->view->render('admin/errors/no_access');
    }
  }


  public function add_user()
  {
    try {
      $id = $this->auth->admin()->createUser($_POST['email'], $_POST['password'], $_POST['username']);
      $data = ['roles_mask' => $_POST['roles_mask'], 'date' => get_date()];


      $data['avatar'] = $this->imageManager->resizeImage($_FILES['image'], null, function () use ($data, $id) {
        // Если файл будет не картинкой -  Без такого колбека он не успеет добавить дату и роль.
        $this->database->update('users', $id, $data);
        return true;
      });


      $this->database->update('users', $id, $data);
      header('Location: /admin/users');
      exit;

    } catch (\Delight\Auth\InvalidEmailException $e) {
      // invalid email address
      flash()->error(['Неправильный формат email']);
    } catch (\Delight\Auth\InvalidPasswordException $e) {
      // invalid password
      flash()->error(['Неправильный пароль']);
    } catch (\Delight\Auth\UserAlreadyExistsException $e) {
      // user already exists
      flash()->error(['Пользователь уже существует']);
    }

    return back();
  }

  public function profile_page($id)
  {
    $user = $this->database->getOne('users', $id);
    $roles = Roles::getRoles();
    echo $this->view->render('admin/users/edit', ['user' => $user, 'roles' => $roles]);
  }

  public function profile_update($id)
  {
    $username = $_POST['username'];
    $roles_mask = $_POST['roles_mask'];
    $password = $_POST['password'];
    $new_password = $_POST['new_password'];
    $file = $_FILES['image'];
    $data = [];

    $data['username'] = $username;

    $curAvatar = $this->database->getArrayCol('users', ['avatar'], 'id=', $id); // нужна для того что бы удалить её.
    $avatar = $this->imageManager->resizeImage($file, $curAvatar[0]['avatar']);

    if (!empty($roles_mask)) {
      $data['roles_mask'] = $roles_mask;
    }

    if ($avatar !== null) {
      // Если пользователь выбрал картинку
      $data['avatar'] = $avatar;
    }

    $this->edit_password($password, $new_password);
    $this->database->update('users', $id, $data);
    header('Location: /admin');
    exit;
    //    password_hash - https://www.php.net/manual/ru/function.password-hash.php
    //    //    if (!empty($_POST['password'])) {
    //    //      $data['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
    //    //    }
  }

  public function edit_password($password, $new_password)
  {
    if (!empty($password) && !empty($new_password)) {
      try {
        $this->auth->changePassword($_POST['password'], $_POST['new_password']);
        flash()->success(['Пароль успешно изменен.']);
        // password has been changed
      } catch (\Delight\Auth\NotLoggedInException $e) {
        // not logged in
        flash()->error(['Войдите в ваш аккаунт']);
      } catch (\Delight\Auth\InvalidPasswordException $e) {
        // invalid password(s)
        flash()->error(['Текущий пароль введен не правильно']);
      } catch (\Delight\Auth\TooManyRequestsException $e) {
        // too many requests
        flash()->error(['Превышен лимит запросов']);
      }
    }
  }

  public function user_remove($id)
  {
    try {
      $curAvatar = $this->database->getArrayCol('categories', ['image'], 'id=', $id);
      $this->imageManager->deleteImage($curAvatar[0]['avatar']);
      $this->auth->admin()->deleteUserById($id);
      header('Location: /admin/users');
      exit;
    } catch (\Delight\Auth\UnknownIdException $e) {
      flash()->error(['Пользователь не найден']);
    }

    return back();
  }
}