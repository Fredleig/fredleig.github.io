<?php

namespace App\Components;


use Intervention\Image\ImageManager;
use Intervention\Image\ImageManagerStatic as Image;
use PhpParser\Node\Expr\Closure;
use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator;

class ImgManager
{
  public $imageManager;
  public $folder;
  public $validator;

  public function __construct(ImageManager $imageManager, Validator $validator)
  {
    $this->imageManager = $imageManager;
    $this->folder = 'img/upload/';
    $this->validator = $validator;
  }

  // Проверяем что это изображение
  public function validate($validator, $imageArr, $func)
  {
    try {
      $validator->assert($imageArr['tmp_name']);
    } catch (NestedValidationException $ex) {
      if ($func) $func();
        flash()->error('Не допустимый формат файла');
        back();
    }
  }

  // Получаем имя файла
  public function get_filename($image, $func, $callback)
  {
    if ($image['size'] > 0) {
      // если пользователь выбрал файл
      $validator = $this->validator->image();
      $this->validate($validator, $image, $func);

      // Генирируем имя файла
      $filename = strtolower($this->random_str(10)   . '.' . pathinfo($image['name'], PATHINFO_EXTENSION));
      return $callback($filename); // Вызываем колбек функцию
    } else {
      return null;
    }
  }

  // Загрузка картинки без изменений
  public function uploadImage($image, $currentImage = null, $func = false)
  {
    // Создаем колбек функцию
    $result = $this->get_filename($image, $func, function ($filename) use ($currentImage, $image) {
      $img = Image::make($image['tmp_name'])->encode('jpg', 90);
      $img->save($this->folder . $filename);
      $this->deleteImage($currentImage);
      // move_uploaded_file($image['tmp_name'], $this->folder . $filename);
      return $filename;
    });
      return $result;
  }

  // Загрузка картинки и изменение размера
  public function resizeImage($image, $currentImage = null, $func = false)
  {
    // Создаем колбек функцию
    $result = $this->get_filename($image, $func, function ($filename) use ($currentImage, $image) {

      $img = Image::make($image['tmp_name']);
      $img->fit(250, 150);
      $img->save($this->folder . $filename);
      $this->deleteImage($currentImage);

      // move_uploaded_file($image['tmp_name'], $this->folder . $filename);
      return $filename;
    });
    return $result;
  }

  public function checkImageExists($name)
  {

    if ($name != null && is_file($this->folder . $name) && file_exists($this->folder . $name)) {
      return true;
    } else {
      return false;
    }
  }

  public function deleteImage($image)
  {
    if ($this->checkImageExists($image)) {
      unlink($this->folder . $image);
    }
  }

  // Получить габариты изображения
  public function getDimensions($file)
  {
    if ($this->checkImageExists($file)) {
      list($width, $height) = getimagesize($this->folder . $file);
      return $width . "x" . $height;
    }
  }

  function getImage($image)
  {

    if ($this->checkImageExists($image)) {
      return "/$this->folder" . $image;
    } else {
      return '/img/noImg.png';
    }

  }

  function getImageUser($image)
  {
    if ($this->checkImageExists($image)) {
      return "/$this->folder" . $image;
    } else {
      return '/img/user.jpg';
    }
  }

  //  Генирировать рандомную строку
  function random_str($length)
  {
    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    return substr(str_shuffle($permitted_chars), 0, $length);
  }

}


