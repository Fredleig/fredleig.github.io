<?php

namespace App\Controllers\admin;

class HomeAdminController extends Controller
{
  public function start_admin()
  {
    echo $this->view->render('admin/starter'); // Вывод верстки - страница home
  }
}
