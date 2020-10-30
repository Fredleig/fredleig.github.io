<?php

namespace App\Controllers\admin;

use App\Components\Database;
use App\Components\ImgManager;
use App\Components\Translit;
use League\Plates\Engine;
use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;

class CategoriesController extends Controller
{

  private $imgManager;
  private $translit;

  public function __construct(Database $database, Engine $view, ImgManager $imgManager, Translit $translit)
  {
    parent::__construct($database, $view);
    $this->imgManager = $imgManager;

    $this->translit = $translit;
  }

  public function categories()
  {
    // Исключил "Нет категории"
    $categories = $this->database->getArrayCol('categories', ['*'], 'id!=', 0);

    echo $this->view->render('admin/categories/categories', ['categories' => $categories]);
  }

  public function create_category()
  {
    echo $this->view->render('admin/categories/create'); // Вывод верстки - страница home
  }

  // Добавить в базу данных категорию
  public function add_category()
  {
    $validator = v::key('categories', v::stringType()->notEmpty());
    $this->validate($validator, $_POST, ['categories' => 'Заполните поле "Название"']);

    $imgName = $this->imgManager->uploadImage($_FILES['image']);
    $data = $_POST;
    $data['label'] = $this->translit->translit($_POST['categories']);
    $data['date'] = date("d.m.Y");
    $data['time'] = date("H:i");

    if($imgName !== null) $data['image'] = $imgName;

    $this->database->add('categories', $data);
    header("Location: /admin/categories");
    exit;
  }

  public function edit($id)
  {
    $category = $this->database->getOne('categories', $id);

    echo $this->view->render('admin/categories/edit', ['category' => $category]);
  }

  public function update($id)
  {

    $validator = v::key('categories', v::stringType()->notEmpty());
    $this->validate($validator, $_POST, ['categories' => 'Заполните поле "Название"']);

    $data = $_POST;
    $data['label'] = $this->translit->translit($_POST['categories']);

    $currentImg = $this->database->getArrayCol('categories', ['image'], 'id=', $id); // нужна для того что бы удалить её.
    $imgName = $this->imgManager->uploadImage($_FILES['image'], $currentImg[0]['image']);

    if ($imgName !== null) {
      // Если пользователь выбрал картинку
      $data = ['image' => $imgName];
    }

    $this->database->update('categories', $id, $data);

    header('Location: /admin/categories');
    exit;
  }

  public function delete($id)
  {
    if ($id == 0 && $id == 1) {
      flash()->error(['Нельзя удалять данную категорию']);
      return back();
    }

    $this->database->delete('posts', 'categories_id=',  $id);
    $this->database->delete('categories', 'id=', $id);

    $currentImg = $this->database->getArrayCol('categories', ['image'], 'id=', $id); // нужна для того что бы удалить её.
    $this->imgManager->deleteImage($currentImg[0]['image']);

    return back();
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
