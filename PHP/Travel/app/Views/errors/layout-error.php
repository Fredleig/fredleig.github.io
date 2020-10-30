<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta property="og:image" content="path/to/image.jpg">
  <link rel="shortcut icon" type="image/png" href="/img/favicon.png">

  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/errors.css">
  <title><?= $title; ?></title>
</head>
<body>
<?= $this->section('content') ?>
</body>
</html>