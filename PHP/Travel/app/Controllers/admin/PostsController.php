<?php

namespace App\Controllers\admin;

use App\Components\Database;
use App\Components\ImgManager;
use League\Plates\Engine;
use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;

class PostsController extends Controller
{

  private $imgManager;

  public function __construct(Database $database, Engine $view, ImgManager $imgManager)
  {
    parent::__construct($database, $view);
    $this->imgManager = $imgManager;
  }

  public function init()
  {
    $table = ['posts', 'categories'];
    $key = ['categories_id', 'id'];

    $post = function ($table, $key) {
      $cols1 = ['id', 'categories_id', 'title', 'image', 'time', 'date']; // posts
      $cols2 = ['categories']; // categories
      return $vars = ['cols' => [$cols1, $cols2], 'table' => $table, 'key' => $key];
    };

    $edit = function ($table, $key) {
      $cols1 = ['id', 'categories_id', 'title', 'city', 'hotel', 'rating', 'content', 'image', 'num_nights']; // posts
      $cols2 = ['categories']; // categories
      return $vars = ['cols' => [$cols1, $cols2], 'table' => $table, 'key' => $key];
    };

    return ['posts' => $post($table, $key), 'edit' => $edit($table, $key)];
  }

  // Все записи
  public function posts_page()
  {
    $var = $this->init()['posts'];

    $posts = $this->database->join($var['cols'], $var['table'], $var['key']);
    $categories = $this->database->getArrayCol('categories');

    echo $this->view->render('admin/posts/posts', ['posts' => $posts, 'categories' => $categories]);
  }

  public function create_page()
  {
    $categories = $this->database->getArrayCol('categories');
    echo $this->view->render('admin/posts/create', ['categories' => $categories]);
  }

  // Добавить в базу данных запись
  public function add_post()
  {
    $validator = v::key('title', v::stringType()->notEmpty())->key('num_nights', v::numeric()->positive());
    $this->validate($validator, $_POST, ['title' => 'Заполните поле "Название"', 'num_nights' => 'Поле "Колличество ночей" не корректно']);

    $data = $_POST;
    $imgName = $this->imgManager->uploadImage($_FILES['image']);
    $data['categories_id'] = (int)$_POST['categories_id'];
//    $data['territory'] = serialize($_POST['territory']);
    $data['date'] = date("d.m.Y");
    $data['time'] = date('H:i');
    if($imgName !== null) $data['image'] = $imgName;

    $this->database->add('posts', $data);

    header("Location: /admin/posts");
    exit;
  }

  public function edit_page($id)
  {
    $var = $this->init()['edit'];

    $post = $this->database->joinOne($var['cols'], $var['table'], $var['key'], 'id', $id);
    $categories = $this->database->getArrayCol('categories');

    echo $this->view->render('admin/posts/edit', ['post' => $post, 'categories' => $categories]);
  }

  public function update_post($id)
  {
    $validator = v::key('title', v::stringType()->notEmpty())->key('num_nights', v::numeric()->positive());
    $this->validate($validator, $_POST, ['title' => 'Заполните поле "Название"', 'num_nights' => 'Поле "Колличество ночей" не корректно']);

    $data = $_POST;

    $currentImg = $this->database->getArrayCol('posts', ['image'], 'id=', $id); // нужна для того что бы удалить её.
    $imgName = $this->imgManager->uploadImage($_FILES['image'], $currentImg[0]['image']);

    if ($imgName !== null) {
      // Если пользователь выбрал картинку
      $data['image'] = $imgName;
    }

    $this->database->update('posts', $id, $data);

    header('Location: /admin/posts');
    exit;
  }

  public function delete_post($id)
  {
    $this->database->delete('posts','id=', $id);

    $currentImg = $this->database->getArrayCol('posts', ['image'], 'id=', $id); // нужна для того что бы удалить её.
    $this->imgManager->deleteImage($currentImg[0]['image']);

    return back();
  }

  public function filter()
  {
    // Если пользователь выбрал "Все записи"
    if ((int)$_POST['filter_categories'] == -1) {

      if (isset($_SESSION['filter_categories'])) unset($_SESSION['filter_categories']);

      header('Location: /admin/posts');
      exit;
    }

    $var = $this->init()['posts'];
    $id_cat = $_POST['filter_categories'];

    $_SESSION['filter_categories'] = $id_cat;

    $posts = $this->database->joinFilter($var['cols'], $var['table'], $var['key'], 'categories_id', $id_cat);
    $categories = $this->database->getArrayCol('categories');

    echo $this->view->render('admin/posts/posts', ['posts' => $posts, 'categories' => $categories]);

  }

  private function validate($validator, $data, $message)
  {
    try {
      $validator->assert($data);

    } catch (NestedValidationException $exception) {
      $exception->findMessages($message);
      flash()->error($exception->getMessages());

      return back();
    }
  }
}
