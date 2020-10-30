<!--Nav bar-->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/"><h4><?= config()['site_name'] ;?></h4></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <?php for ($i = 2, $max = count($categories); $i < $max; $i++): ?>
        <li class="nav-item">
          <a class="nav-link"
             href="/category/<?= $categories[$i]['label']; ?>/"><?= $categories[$i]['categories']; ?></a>
        </li>
      <?php endfor; ?>
    </ul>
    <?php if (home_admin()): ?>
      <a href="/admin" class="btn btn-warning mr-2">Админ-меню</a>
      <a href="/logout" class="btn btn-info mr-2">Выход</a>
    <?php else: ?>
      <a href="/login" class="btn btn-success mr-2">Вход</a>
      <a href="/registration" class="btn btn-info">Регистрация</a>
    <?php endif; ?>
  </div>
</nav>
<!--/Nav bar-->