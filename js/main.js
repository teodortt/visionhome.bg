(function ($) {

	"use strict";


	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
	$.Scrollax();

	var carousel = function () {

		// HERO SLIDER
		var $home = $('.home-slider');
		$home
			.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function () {
				patchHomeA11y();
			})
			.owlCarousel({
				loop: true,
				autoplay: true,
				margin: 0,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				nav: true,
				dots: true,
				autoplayHoverPause: false,
				items: 1,
				navText: [
					"<span class='ion-ios-arrow-back'></span>",
					"<span class='ion-ios-arrow-forward'></span>"
				],
				responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } }
			});
		patchHomeA11y();

		function patchHomeA11y() {
			var $wrap = $('.home-slider');
			$wrap.find('.owl-item.cloned').attr('aria-hidden', 'true');
			var $prev = $wrap.find('.owl-prev');
			var $next = $wrap.find('.owl-next');
			if ($prev.length) $prev.attr({ 'aria-label': 'Предишен слайд', 'type': 'button' }).removeAttr('role');
			if ($next.length) $next.attr({ 'aria-label': 'Следващ слайд', 'type': 'button' }).removeAttr('role');

			var $dots = $wrap.find('.owl-dot');
			var total = $dots.length;
			if (total) {
				$dots.each(function (i) {
					$(this)
						.attr({ 'aria-label': 'Слайд ' + (i + 1) + ' от ' + total, 'type': 'button' })
						.removeAttr('role');
				});
				$dots.removeAttr('aria-current')
					.filter('.active')
					.attr('aria-current', 'true');
			}
		}

		// TESTIMONY SLIDER
		var $test = $('.carousel-testimony');
		$test
			.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function () {
				patchTestA11y();
			})
			.owlCarousel({
				center: true,
				loop: true,
				items: 1,
				margin: 30,
				stagePadding: 0,
				nav: false,
				dots: true,
				navText: [
					"<span class='ion-ios-arrow-back'></span>",
					"<span class='ion-ios-arrow-forward'></span>"
				],
				responsive: {
					0: { items: 1 },
					600: { items: 2 },
					1000: { items: 3 }
				}
			});

		function patchTestA11y() {
			// Няма nav (nav:false), така че само dots
			var $wrap = $('.carousel-testimony');
			var $dots = $wrap.find('.owl-dot');
			var total = $dots.length;
			if (total) {
				$dots.each(function (i) {
					$(this)
						.attr({ 'aria-label': 'Отзив ' + (i + 1) + ' от ' + total, 'type': 'button' })
						.removeAttr('role');
				});
				$dots.removeAttr('aria-current')
					.filter('.active')
					.attr('aria-current', 'true');
			}
		}

	};

	carousel();

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		// timer;
		// timer = setTimeout(function(){
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});


	var counter = function () {

		$('#section-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					console.log(num);
					$this.animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();

	var contentWayPoint = function () {
		var observer = new IntersectionObserver(function (entries) {
			var visible = entries.filter(function (entry) {
				return entry.isIntersecting && !$(entry.target).hasClass('ftco-animated');
			});

			visible.forEach(function (entry, index) {
				observer.unobserve(entry.target);
				setTimeout(function () {
					var el = $(entry.target);
					var effect = el.data('animate-effect');
					if (effect === 'fadeIn') {
						el.addClass('fadeIn ftco-animated');
					} else if (effect === 'fadeInLeft') {
						el.addClass('fadeInLeft ftco-animated');
					} else if (effect === 'fadeInRight') {
						el.addClass('fadeInRight ftco-animated');
					} else {
						el.addClass('fadeInUp ftco-animated');
					}
				}, 100 + index * 50);
			});
		}, { rootMargin: '0px 0px -5% 0px' });

		$('.ftco-animate').each(function () {
			observer.observe(this);
		});
	};
	contentWayPoint();



})(jQuery);

