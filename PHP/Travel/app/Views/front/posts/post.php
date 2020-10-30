<?php $this->layout('front/layout', ['title'=> config()['site_name']." - {$post['one_title']}",'categories' => $categories]); ?>
<!--Preview-->
<div class="banner">
    <img src="<?= get_image($post['one_image']); ?>" alt="Горы">
</div>
<!--/Preview-->
<!--Post-->
<div class="post-wrapper">
  <div class="container">
    <div class="card">    

      <h2 class="card-header"><?= $post['one_title']; ?></h2>
      <div class="card-body">
        <h5 class="card-subtitle text-muted">Особенности:</h5>
      </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fa fa-university" aria-hidden="true"></i><strong>Город:</strong><?= $post['one_city']; ?>
        </li>

        <li class="list-group-item" >
          <div class="post-hotel"><i class="fa fa-bed" aria-hidden="true"></i><strong>Отель:</strong><?= $post['one_hotel']; ?></div>
          <div class="post-rating rating" data-rating="<?=$post['one_rating'];?>">
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
            <i class="fa fa-fw fa-star-o"></i>
          </div>
        </li>

        <li class="list-group-item">
          <i class="fa fa-calendar" aria-hidden="true"></i><strong>Колличество ночей:</strong><?= $post['one_num_nights']; ?>
        </li>
        <li class="list-group-item description">
          <h5 class="card-subtitle text-muted">Описание:</h5>
          <div class="card-body">
            <?= $post['one_content'] ?>
          </div>
        </li>
      </ul>

      <div class="card-footer text-muted"></div>
    </div>
  </div>
</div>
<!--/Post-->