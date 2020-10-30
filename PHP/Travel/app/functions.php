<?php

use App\Components\Database;
use App\Components\ImgManager;
use App\Components\mail\Roles;
use Delight\Auth\Auth;
use Delight\Auth\Role;
use JasonGrimes\Paginator;


// Получить компонент
function components($name)
{
  global $container;
  return $container->get($name);
}

function auth()
{
  global $container;
  return $container->get(Auth::class);
}

// Вернуться на предыдущую страницу
function back()
{
  header("Location: " . $_SERVER['HTTP_REFERER']);
  exit;
}

// Текущая страница
function currentUrl()
{
  return $_SERVER['REQUEST_URI'];
}

// Мой домен http://project/ (не использовал ни где)
function my_domain()
{
  return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/';
}
// Костыль для ссылки постов
function link_post($category)
{
  if (empty($category)) {
    return '/';
  } else {
    return "/category/$category/";
  }
}

// Проверить залогинен ли пользователь
function home_admin()
{
  $auth = components(Auth::class);
  return $auth->check();
}


// Получить роль
function getRole($key)
{
  return Roles::getRole($key);
}

// Вывод изображения
function get_image($image)
{
  $imgMngr = components(ImgManager::class);
  return $imgMngr->getImage($image);
}

function get_avatar($image)
{
  $imgMngr = components(ImgManager::class);
  return $imgMngr->getImageUser($image);
}

// Конец Вывод изображения

// Получить информацию о текущем пользователе (который залогенен)
function get_user_info()
{
  $database = components(Database::class);
  $auth = components(Auth::class);
  $data = $database->getOne('users', $auth->getUserId());
  $user_data = [
      'id' => $data['id'],
      'name' => $data['username'],
      'role' => getRole($data['roles_mask']),
      'avatar' => $data['avatar'],
      'date' => $data['date']
  ];
  return $user_data;
}

// Проверить доступ по роли.
function check_access()
{
  $auth = components(Auth::class);
  if ($auth->hasRole(Role::ADMIN)) {
    return true;
  } else {
    return false;
  }
}

// Получить текущую дату в формате "31 января 2019г"
function get_date()
{
  $currentDate = date("d.m.Y");
  //Список месяцев с названиями для замены
  $_monthsList = array(
      ".01." => "января",
      ".02." => "февраля",
      ".03." => "марта",
      ".04." => "апреля",
      ".05." => "мая",
      ".06." => "июня",
      ".07." => "июля",
      ".08." => "августа",
      ".09." => "сентября",
      ".10." => "октября",
      ".11." => "ноября",
      ".12." => "декабря"
  );
  // Заменяем число месяца на название:
  $_mD = date(".m."); //для замены
  return str_replace($_mD, " " . $_monthsList[$_mD] . " ", $currentDate . "г");
}

// Пагинация
function paginate($count, $page, $perPage, $url)
{
  $totalItems = $count;
  $itemsPerPage = $perPage;
  $currentPage = $page;
  $urlPattern = $url;

  $paginator = new Paginator($totalItems, $itemsPerPage, $currentPage, $urlPattern);
  return $paginator;
}

function valide_paginate($pagesCount)
{
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
  }
  if ((int)$_GET['page'] > $pagesCount || (int)$_GET['page'] < 0) {
    $page = $pagesCount;
  } elseif ((int)$_GET['page'] === 0) {
    $page = 1;
  }

  return $page;
}

// Конец Пагинация


function config()
{
  return ['site_name' => 'Travel', 'domain' => 'http://project/'];
}

// Отрезать часть текста, что бы в конце было полноценное слово.
function cutStr($str, $length=450, $postfix=' ...')
{
  if ( strlen($str) <= $length) return $str;

  $temp = substr($str, 0, $length);
  return substr($temp, 0, strrpos($temp, ' ') ) . $postfix;
}