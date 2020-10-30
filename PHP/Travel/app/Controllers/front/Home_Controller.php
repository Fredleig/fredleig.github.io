<?php

namespace App\Controllers\front;

class Home_Controller extends Controller
{

  private function init()
  {
    $post = ['id', 'categories_id', 'title', 'city', 'hotel', 'rating', 'num_nights', 'content', 'image'];

    $pagination['limit'] = 3;
    $pagination['count'] = $this->database->getCount('posts','categories_id!=', 0);
    $pagination['pagesCount'] = ceil($pagination['count'] / $pagination['limit']);
    $pagination['page'] = valide_paginate($pagination['pagesCount']);

    $curCategory = ['id', 'categories', 'text_banner', 'color_banner', 'image'];

    $vars = ['post' => $post, 'pagination' => $pagination, 'curCategory' => $curCategory];
    return $vars;
  }

  public function home()
  {
    $pagin = $this->init()['pagination'];
    $cols = $this->init()['post'];
    $curCategoryCol = $this->init()['curCategory'];

    $categories = $this->database->getArrayCol('categories', ['label', 'categories']); // получаем список
    $curCategory = $this->database->getArrayCol('categories', $curCategoryCol, 'id=', 1);
    $posts = $this->database->allPaginate('posts', $cols, $pagin['page'], $pagin['limit'], 'categories_id!=', 0);

    $paginator = paginate($pagin['count'], $pagin['page'], $pagin['limit'], '/?page=(:num)');

    $data = ['posts' => $posts, 'categories' => $categories, 'paginator' => $paginator, 'curCategory' => $curCategory[0]];
    echo $this->view->render('front/home', $data);
  }

  public function category($categoryLabel)
  {
    $curCategoryCol = $this->init()['curCategory'];
    $pagin = $this->init()['pagination'];
    $cols = $this->init()['post'];
    $colsAll = [[], $cols];
    $table = ['categories', 'posts'];
    $key = ['id', 'categories_id'];

    $categories = $this->database->getArrayCol('categories', ['label', 'categories']); // получаем список
    $curCategory = $this->database->getArrayCol('categories', $curCategoryCol, 'label=', $categoryLabel);
    $posts = $this->database->paginJoinFilter($colsAll, $table, $key, 'label', $categoryLabel, $pagin['page'], $pagin['limit']);

    $pagin['count'] = $this->database->getCount('posts', "categories_id=", $curCategory[0]['id']);

    $paginator = paginate($pagin['count'], $pagin['page'], $pagin['limit'], "/category/$categoryLabel/?page=(:num)");
    $data =
        [
            'posts' => $posts,
            'categories' => $categories,
            'paginator' => $paginator,
            'curCategory' => $curCategory[0],
            'categoryLabel' => $categoryLabel
        ];

    echo $this->view->render('front/home', $data);
  }

  public function getPost($post_id)
  {
    $cols = $this->init()['post']; // posts
    $colsAll = [$cols, []];
    $table = ['posts', 'categories'];
    $key = ['categories_id', 'id'];

    $categories = $this->database->getArrayCol('categories', ['label', 'categories']); // получаем список
    $post = $this->database->joinOne($colsAll, $table, $key, 'id', $post_id);

    echo $this->view->render('front/posts/post', ['post' => $post, 'categories' => $categories]);
  }

}

