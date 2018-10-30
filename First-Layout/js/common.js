$(function() {

  $('.chart').easyPieChart({
  	lineCap: 'butt',
  	trackColor: '#424242',
  	rotate: '-90',
  	scaleLength: '0',
  	size: '170',
  	lineWidth: '30',
	  barColor: function(percent) {
	    var ctx = this.renderer.getCtx();
	    var canvas = this.renderer.getCanvas();
	    var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
	        gradient.addColorStop(0, "#1bbc9d");
	        gradient.addColorStop(1, "#aaca29");
	    return gradient;
	  }
});

	$('.carousel-welcome').owlCarousel({
		items: 1,
		loop: true,
		nav: false,
		autoplay: true,
		mouseDrag: false,
		touchDrag: false,
		autoplayTimeout: 18000,
		animateIn: 'fadeIn',
		navText: ['<i class="fa fa-chevron-circle-left"></i>', '<i class="fa fa-chevron-circle-right"></i>'],
	});

	AOS.init({
		duration: 1200,
		once: true,
		disable: 'mobile',
		mirror: false,
		easing: 'ease'
	});

		// Кнопка наверх	(в 1 части скрывает кнопку, 2 часть анимирует и выполняет действие)
	$(window).scroll(function(){
		if ($(this).scrollTop() > $(this).height()) {
			$('.button-top').addClass('active');
		} else {
			$('.button-top').removeClass('active');
		}
	}); 
	$('.button-top').click(function(){
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

	// плавная прокрутка к якорю
	var $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 1200);
		return false;
	});


  $(".category-button").click(function(){
      // get the data-filter value of the button
      var filterValue = $(this).attr('data-filter');
      var curClass = $('.category-button').removeClass('current');
      var currentClass = $(this).addClass('current');
      $('#show-more').hide();

      
      // show all items
      if(filterValue == "all")
      {
      	$(".all").show("slow");
      }
      else
      {   
          // hide all items
          $(".all").not('.'+filterValue).hide("slow");
          // and then, show only items with selected data-filter value
          $(".all").filter('.'+filterValue).show("slow");
        }
      });

	$('.price-option>ul>li').each(function(){
		var $p = $(this);
		$p.html($p.html().replace(/^(\w+)/, '<strong>$1</strong>')); 
	});	




		//E-mail Ajax Send
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display','flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 4000);
		});
		return false;
	});

	$(window).on('load', function(){
		$('.preloader').delay(2500).fadeOut('slow');
	});

});
