<div class="pagination-wrap">
  <ul class="pagination pagination-lg">
    <?php if ($paginator->getNumPages() > 1): ?>
      <!--   Prev btn   -->
      <?php if ($paginator->getPrevUrl()): ?>
        <li class="page-item">
      <?php else: ?>
        <li class="page-item disabled">
      <?php endif; ?>
      <a class="page-link" href="<?php echo $paginator->getPrevUrl(); ?>">&laquo;</a>
      </li>

      <!--   btn   -->
      <?php foreach ($paginator->getPages() as $page): ?>
        <?php if ($page['url']): ?>
          <li <?php echo $page['isCurrent'] ? 'class="page-item active"' : 'page-item'; ?>>
            <a class="page-link" href="<?php echo $page['url']; ?>"><?php echo $page['num']; ?></a>
          </li>
        <?php endif; ?>
      <?php endforeach; ?>

      <!--  next btn   -->
      <?php if ($paginator->getNextUrl()): ?>
        <li class="page-item">
      <?php else: ?>
        <li class="page-item disabled">
      <?php endif; ?>
      <a class="page-link" href="<?php echo $paginator->getNextUrl(); ?>">&raquo;</a>
      </li>
    <?php endif; ?>
  </ul>
</div>
