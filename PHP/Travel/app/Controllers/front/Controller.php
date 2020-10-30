<?php

namespace App\Controllers\front;


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
    $this->auth = components(Auth::class); // $this->auth = new Auth();
    $this->view = components(Engine::class);
    $this->database = components(Database::class);
  }
}
