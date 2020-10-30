<?php $this->layout('front/layout', ['title' => config()['site_name']." - {$curCategory['categories']}", 'categories' => $categories]); ?>
<!--Preview-->
<div class="banner">
  <img src="<?= get_image($curCategory['image']); ?>" alt="Горы">
  <?php if ($curCategory['text_banner']): ?>
    <div class="banner-text-wrap">
      <div class="container" style="background-color: <?= $curCategory['color_banner']; ?>">
        <?= $curCategory['text_banner']; ?>
      </div>
    </div>
  <?php endif; ?>
</div>
<!--/Preview-->
<!--Posts-->
<div class="posts">
  <?php foreach ($posts as $post): ?>
    <!-- Post -->
    <div class="card">
      <h3 class="card-header"><?= $post['two_title']; ?></h3>
      <img src="<?= get_image($post['two_image']); ?>" alt="Card image">
      <ul class="list-group list-group-flush">

        <li class="list-group-item">
          <i class="fa fa-university" aria-hidden="true"></i><strong>Город:</strong><?= $post['two_city']; ?>
        </li>

        <li class="list-group-item">
          <i class="fa fa-bed" aria-hidden="true"></i><strong>Отель:</strong><?= $post['two_hotel']; ?>
          <div class="rating" data-rating="<?=$post['two_rating'];?>">
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
          </div>
        </li>

        <li class="list-group-item">
          <i class="fa fa-calendar" aria-hidden="true"></i><strong>Колличество ночей:</strong><?= $post['two_num_nights']; ?>
        </li>
      </ul>

      <div class="card-body">
        <p class="card-text"><?= cutStr($post['two_content']); ?></p>
      </div>
      <div class="card-footer text-muted">
        <a href="<?= link_post($categoryLabel) . 'post=' . $post['two_id']; ?>" class="card-link">Подробнее</a>
      </div>
    </div>
    <!-- /Post -->
  <?php endforeach; ?>
</div>


<?php !empty($posts) ? $this->insert('front/partials/pagination', ['paginator' => $paginator]) : $this->insert('errors/empty'); ?>

