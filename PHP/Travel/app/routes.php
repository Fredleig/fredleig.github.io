<?php

use DI\ContainerBuilder;
use FastRoute\RouteCollector;
use Aura\SqlQuery\QueryFactory;
use Delight\Auth\Auth;
use Intervention\Image\ImageManager;
use League\Plates\Engine;

$containerBuilder = new ContainerBuilder;
$containerBuilder->addDefinitions([
    Engine::class => function () {
      return new Engine('../app/Views');
    },
    ImageManager::class => function () {
      return new ImageManager(array('driver' => 'imagick'));
    },
    PDO::class => function () {
      return new PDO("mysql:host=localhost; dbname=project-traveling; charset = utf8mb4", "root", "");
    },
    Swift_Mailer::class => function () {
      $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
          ->setUsername('grinding191@gmail.com')
          ->setPassword('jlyjukfpsq12pjhj21');
      return new Swift_Mailer($transport);
    },
    Auth::class => function ($container) {
      return new Auth($container->get('PDO'));
    },

    QueryFactory::class => function () {
      return new QueryFactory('mysql');
    },

]);

$container = $containerBuilder->build();

// ------------------------------------------------ ROUTE -------------------------------------------- //
$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
  //  FRONT GROUP
  $r->addGroup('/', function (RouteCollector $r) {
    $r->addRoute('GET', '[page={id:\d+}]', ['App\Controllers\front\Home_Controller', 'home']);
    $r->addRoute('GET', 'category/{categoryLabel}/[?page={id:\d+}]', ['App\Controllers\front\Home_Controller', 'category']);
    // getPost
    $r->addRoute('GET', 'post={post_id:\d+}', ['App\Controllers\front\Home_Controller', 'getPost']);
    $r->addRoute('GET', 'category/{categoryLabel}/post={post_id:\d+}', ['App\Controllers\front\Home_Controller', 'getPost']);

    // Aut [/{id:\d+}[/{name}]]
    $r->addRoute('GET', 'registration', ['App\Controllers\front\RegisterController', 'register_page']);
    $r->addRoute('POST', 'register', ['App\Controllers\front\RegisterController', 'register']);
    $r->addRoute('GET', 'verify_email', ['App\Controllers\front\VerificationController', 'verify']); // подтердили почту
    $r->addRoute('GET', 'login', ['App\Controllers\front\LoginController', 'login_page']);
    $r->addRoute('POST', 'login/login_action', ['App\Controllers\front\LoginController', 'login']);
    $r->addRoute('GET', 'logout', ['App\Controllers\front\LoginController', 'logout']);
    $r->addRoute('GET', 'email-verification', ['App\Controllers\front\VerificationController', 'showForm']);
    $r->addRoute('POST', 'email-verification/re_confirmation', ['App\Controllers\front\RegisterController', 'repeat_letter']);
    // Auth reset-password
    $r->addRoute('GET', 'password-recovery', ['App\Controllers\front\ResetPasswController', 'recovery_page']);
    $r->addRoute('POST', 'password-recovery', ['App\Controllers\front\ResetPasswController', 'recovery']);
    $r->addRoute('GET', 'password-recovery/form', ['App\Controllers\front\ResetPasswController', 'reset_passw_page']); // подтердили сброс
    $r->addRoute('POST', 'password-recovery/change', ['App\Controllers\front\ResetPasswController', 'change']); // подтердили сброс
  });
  //  admin GROUP
  $r->addGroup('/admin', function (RouteCollector $r) {
    $r->addRoute('GET', '', ['App\Controllers\admin\HomeAdminController', 'start_admin']);
    // Categories
    $r->addRoute('GET', '/categories', ['App\Controllers\admin\CategoriesController', 'categories']);
    $r->addRoute('GET', '/categories/create', ['App\Controllers\admin\CategoriesController', 'create_category']);
    $r->addRoute('POST', '/categories/add', ['App\Controllers\admin\CategoriesController', 'add_category']);
    $r->addRoute('GET', '/categories/edit/{id:\d+}', ['App\Controllers\admin\CategoriesController', 'edit']);
    $r->addRoute('POST', '/categories/edit/{id:\d+}', ['App\Controllers\admin\CategoriesController', 'update']);
    $r->addRoute('GET', '/categories/delete/{id:\d+}', ['App\Controllers\admin\CategoriesController', 'delete']);
    // Posts
    $r->addRoute('GET', '/posts', ['App\Controllers\admin\PostsController', 'posts_page']);
    $r->addRoute('POST', '/posts', ['App\Controllers\admin\PostsController', 'filter']);
    $r->addRoute('GET', '/posts/create', ['App\Controllers\admin\PostsController', 'create_page']);
    $r->addRoute('POST', '/posts/add', ['App\Controllers\admin\PostsController', 'add_post']);
    $r->addRoute('GET', '/posts/edit/{id:\d+}', ['App\Controllers\admin\PostsController', 'edit_page']);
    $r->addRoute('POST', '/posts/edit/{id:\d+}', ['App\Controllers\admin\PostsController', 'update_post']);
    $r->addRoute('GET', '/posts/delete/{id:\d+}', ['App\Controllers\admin\PostsController', 'delete_post']);
    // Users
    $r->addRoute('GET', '/users', ['App\Controllers\admin\UserController', 'page_users']);
    $r->addRoute('GET', '/users/create', ['App\Controllers\admin\UserController', 'create_user_page']);
    $r->addRoute('POST', '/users/add', ['App\Controllers\admin\UserController', 'add_user']);
    $r->addRoute('GET', '/users/profile/{id:\d+}', ['App\Controllers\admin\UserController', 'profile_page']);
    $r->addRoute('POST', '/users/profile/{id:\d+}/update', ['App\Controllers\admin\UserController', 'profile_update']);
    $r->addRoute('GET', '/users/user_remove/{id:\d+}', ['App\Controllers\admin\UserController', 'user_remove']);
  });
});

// Fetch method and URI from somewhere
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string (?foo=bar) and decode URI
if (false !== $pos = strpos($uri, '?')) {
  $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
    // Not found
    echo $container->get(Engine::class)->render('errors/404');
    break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
    // Method Not Allowed
    echo $container->get(Engine::class)->render('errors/405');
    break;
  case FastRoute\Dispatcher::FOUND:
    $handler = $routeInfo[1];
    $vars = $routeInfo[2];
    // ... call $handler with $vars
    $container->call($handler, $vars);
    break;
}