const showRating = (function () {

      let empty = 'fa-star-o';
      let halfFull = 'fa-star-half-full';
      let full = 'fa-star';

      let rating = [];
      let count;

      function start(ratingStars) {

        ratingStars.forEach((value, index, array) => {
          getNumRating(value);
          paintTheStars([...array[index].children]);
          // [...array[index].children]; - преообразуем NodeList в массив
        });
      }

      //Полчить рейтинг
      function getNumRating(value) {
        rating.push(+value.dataset.rating);
        count = rating.length - 1;
      }

      // Красим звезды
      function paintTheStars(stars) {
        stars.forEach((star, index, array) => _paint(index, array));
      }

      function _paint(index, array) {
        // let ratingClosest = star.closest('.rating').dataset.rating; // или можно так получить рейтинг, хз что лучше

        if (rating[count] > 0) {

          if (index < rating[count]) {
            array[index].classList.remove(empty);
            array[index].classList.add(full);
          }

          if (rating[count] % 1 !== 0) {
            let lastNumStar = Math.floor(rating[count]);
            let lastStar = array[Math.floor(lastNumStar)];
            lastStar.classList.remove(empty);
            lastStar.classList.add(halfFull);
          }
        }
      }

      return {
        start
      }

    }
)();

// Показать рейтинг
function startShowRating() {
  let ratingStars = document.querySelectorAll('.rating');
  if (ratingStars) showRating.start(ratingStars);
}

startShowRating();
