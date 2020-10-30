<?php

namespace App\Controllers\admin;


use App\Components\Database;
use Delight\Auth\Auth;
use League\Plates\Engine;

class Controller
{
  protected $auth;
  protected $view;
  protected $database;

  public function __construct()
  {
    $this->auth = components(Auth::class);
    $this->view = components(Engine::class);
    $this->database = components(Database::class);
    if (!$this->auth->check()) {
      header('Location: login');
      exit;
    }
  }

  public function no_access()
  {
    echo $this->view->render('errors/404');
  }
}

