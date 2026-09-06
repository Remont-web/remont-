$(function() {

	$("#cities-search").on("input",function(){var e=$(this).val();$("[data-city-name]").each(function(){var t=$(this),i=new RegExp("^"+e,"i").test(t.data("city-name"));!e||i?t.show():t.hide()})});
	var sliders=$(".jolly-slider"),additionalSliders=$(".jolly-slider-extra"),options={lazyLoad:"progressive",autoplay:!0,autoplaySpeed:7e3,slidesToShow:1,slidesToScroll:1,arrows:!1,dots:!1,focusOnSelect:!0,pauseOnHover:!1};function calculateJollySliderHeight(){sliders.each(function(){var i=$(this);i.find("img").css("height",Math.floor(.42735*i.width())+"px")})}0<sliders.length&&(calculateJollySliderHeight(),sliders.each(function(){var a=$(this),e=a.closest(".carousel").find(".jolly-slide-control");a.data("nav-for")&&0<additionalSliders.length?a.slick($.extend(options,{asNavFor:a.data("slider-nav")})):a.slick(options),e.on("click",function(){var i=$(this);a.slick("slickGoTo",i.index()),e.removeClass("active"),i.addClass("active"),a.data("nav-for")&&$(a.data("nav-for")).slick("slickGoTo",i.index())}),a.on("afterChange",function(){var i=e.eq(a.slick("slickCurrentSlide"));e.removeClass("active"),i.addClass("active")})}),$(window).on("resize",calculateJollySliderHeight)),0<additionalSliders.length&&additionalSliders.each(function(){var i=$(this);i.data("slider-for")&&0<sliders.length?i.slick($.extend(options,{asNavFor:i.data("slider-for"),fade:!0})):i.slick(options)});
	var calc_range=$("[data-range-value]"),calc_value=$("[data-range-slider]"),calc_sync=$("[data-sync-with]"),calculators=$(".calculator-body");calc_range.length&&calc_value.length&&(calc_range.on("input change",function(){var i=$($(this).data("range-value"));i.length&&i.val($(this).val())}),calc_value.on("input change",function(){var i=$($(this).data("range-slider"));i.length&&i.val($(this).val())})),calc_sync.length&&calc_sync.on("input change",function(){var i=$($(this).data("sync-with"));i.length&&i.not(this).val($(this).val())}),calculators.length&&calculators.find("input").on("input change",function(){var i=$(this).closest(".calculator-body"),a=i.find(".js-module-calc-value"),e=i.find("input[data-base-value]:first"),t=i.find("input[data-multiplier]:checked");if(a.length&&e.length&&t.length){var l=parseFloat(e.val());t.each(function(){l*=parseFloat($(this).data("multiplier"))}),a.text(Math.ceil(l).toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1 '))}});

	// Общие

	$('input[type=tel]').inputmask("+7 (999)-999-9999");

	// Меню

	$('.navbar').click(function() {
		$(this).toggleClass('active');
		$('.menu-wrapper').toggleClass('active');
		return false;
	});

	$(document).mouseup(function (e){
		var div = $(".menu-wrapper, .navbar");
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
			$('.menu-wrapper, .navbar').removeClass('active');
		}
	});

	$('.scroll-link').click(function(event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 500);
	});

	// Калькулятор

	let minValue = Number($(".js-range-slider").attr('data-min'));
    let maxValue = Number($(".js-range-slider").attr('data-max'));

	$(".js-range-slider").ionRangeSlider({
        onChange: function (data) {
            $('.area__number input').val(data.from);
            fromValue = data.from;
        },
    });
    let rangeSlider = $(".js-range-slider").data("ionRangeSlider");

    $('.area__number-minus').click(function() {
    	let currentValue = Number($(this).next().val());
    	if (currentValue <= minValue) {
			return false;
		} else {
			currentValue = currentValue - 1;
			$(this).next().val(currentValue);
			rangeSlider.update({
		        from: currentValue
		    });
		}
    });

    $('.area__number-plus').click(function() {
    	let currentValue = Number($(this).prev().val());
    	if (currentValue >= maxValue) {
			return false;
		} else {
			currentValue = currentValue + 1;
			$(this).prev().val(currentValue);
			rangeSlider.update({
		        from: currentValue
		    });
		}
    });

    //  Квиз

    $('.quiz__next').click(function() {
    	let stepNumber = $(this).data('step');
    	$('.quiz__item').removeClass('active');
    	$('.quiz__steps span.quiz-step-' + (stepNumber - 1)).addClass('active');
    	$('.quiz__steps p.quiz-step-' + stepNumber).addClass('active');
    	$('#quiz-step-' + stepNumber).addClass('active');
    	return false;
    });

    $('.quiz__prev').click(function() {
    	let stepNumber = $(this).data('step');
    	$('.quiz__steps span.quiz-step-' + stepNumber).removeClass('active');
    	$('.quiz__steps p.quiz-step-' + (stepNumber + 1)).removeClass('active');
    	$('.quiz__item').removeClass('active');
    	$('#quiz-step-' + stepNumber).addClass('active');
    	$('.quiz__steps span.quiz-step-' + (stepNumber - 1)).addClass('active');
    	$('.quiz__steps p.quiz-step-' + stepNumber).addClass('active');
    	return false;
    });

    // Варианты ремонта квартир

    $('.repair__tabs a').click(function() {
    	let repairTab = $(this).attr('href');
    	$('.repair__item').removeClass('active').hide();
    	$(repairTab).addClass('active').show();
    	$('.repair__tabs a').removeClass('active');
    	$(this).addClass('active');
    	return false;
    });

	$('.repair__item').each(function() {
        const repairItemId = $(this).attr('id');

		const repairThumbnailsSlider = new Swiper('#' + repairItemId + ' .repair__thumbnails', {
			slidesPerView: 4,
			spaceBetween: 6,
			breakpoints: {
				992: {
					spaceBetween: 12
				},
			}
		});

		const repairSlider = new Swiper('#' + repairItemId + ' .repair__slider', {
			slidesPerView: 1,
			spaceBetween: 20,
			thumbs: {
				swiper: repairThumbnailsSlider
			}
		});
	});

	$('.repair__more').click(function() {
		$(this).parents('.repair__info').find('li').removeClass('hidden');
		$(this).hide();
		return false;
	});

	// Примеры наших работ

	const worksSlider = new Swiper('.works__slider', {
	  slidesPerView: 1,
	  spaceBetween: 40,
	  navigation: {
	    nextEl: '.works__arrow_next',
	    prevEl: '.works__arrow_prev',
	  },
	  pagination: {
	    el: '.works__dots',
	    type: 'bullets',
	    clickable: true
	  }
	});

	$('.work__img-desktop').click(function() {
		let img = $(this).attr('href');
		$(this).parents('.work').find('.work__img-cover').attr('href', img);
		$(this).parents('.work').find('.work__img-cover').attr('data-fancybox-index', $(this).index('.work__img-desktop'));
		$(this).parents('.work').find('.work__img-cover img').attr('src', img);
		return false;
	});

	// Цены на услуги

	$('.price__tabs a').click(function() {
    	let priceTab = $(this).attr('href');
    	$('.price__block').hide();
    	$(priceTab).show();
    	$('.price__tabs a').removeClass('active');
    	$(this).addClass('active');
    	return false;
    });

    $('.price__btn a').click(function() {
    	$(this).parents('.price__block').find('.price__item').removeClass('hidden');
    	$(this).hide();
    	return false;
    });

    // Отзывы

    $('.testimonials__more, .team__btn').click(function() {
    	$(this).prev().addClass('active');
    	$(this).hide();
    	return false;
    });

	// FAQ

	$('.faq__question').click(function() {
		$(this).parents('.faq__item').toggleClass('active');
		$(this).next().slideToggle(300);
	});

	// Сертификаты и награды

	const certsSlider = new Swiper('.certs__slider', {
	  slidesPerView: 1,
	  spaceBetween: 15,
	  navigation: {
	    nextEl: '.certs__arrow_next',
	    prevEl: '.certs__arrow_prev',
	  },
	  pagination: {
	    el: '.certs__dots',
	    type: 'bullets',
	    clickable: true
	  },
	  breakpoints: {
	  	576: {
	      slidesPerView: 2,
	      spaceBetween: 20,
	    },
	    768: {
	      slidesPerView: 3,
	      spaceBetween: 25,
	    },
	    992: {
	      slidesPerView: 4,
	      spaceBetween: 25,
	    },
	  }
	});

	// Собственный склад

	const stockThumbnailsSlider = new Swiper('.stock__thumbnails', {
	  slidesPerView: 4,
	  spaceBetween: 12,
	});

    const stockSlider = new Swiper('.stock__slider', {
	  slidesPerView: 1,
	  spaceBetween: 20,
	  thumbs: {
      		swiper: stockThumbnailsSlider
    	}
	});

	// Наши филиалы

	$('.cities__tabs a').click(function() {
    	let citiesTab = $(this).attr('href');
    	$('.cities__list').hide();
    	$(citiesTab).show();
    	$('.cities__tabs a').removeClass('active');
    	$(this).addClass('active');
    	return false;
    });

	
    
});


function setupFancyboxGallery() {
    // Находим все контейнеры
    const containers = document.querySelectorAll('.work__images > div');
    
    containers.forEach((container, index) => {
        const preview = container.querySelector('img');
        const mobileLink = container.querySelector('.work__img-mobile');
        
        if (preview && mobileLink) {
            // Добавляем data-атрибуты для правильной работы Fancybox
            mobileLink.setAttribute('data-fancybox', 'work-gallery');
            mobileLink.setAttribute('data-src', mobileLink.getAttribute('href'));
            
            // Связываем превью с соответствующей большой картинкой
            preview.setAttribute('data-fancybox-trigger', 'work-gallery');
            preview.setAttribute('data-index', index);
            
            // Обработчик клика на превью
            preview.addEventListener('click', function() {
                const allLinks = document.querySelectorAll('[data-fancybox="work-gallery"]');
                const currentIndex = parseInt(this.getAttribute('data-index'));
                
                // Инициализируем Fancybox, если еще не инициализирован
                if (typeof Fancybox !== 'undefined') {
                    Fancybox.bind('[data-fancybox="work-gallery"]', {
                        startIndex: currentIndex
                    });
                    
                    // Триггерим клик на соответствующей ссылке
                    if (allLinks[currentIndex]) {
                        allLinks[currentIndex].click();
                    }
                }
            });
        }
    });
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setupFancyboxGallery();
    setupMobileFancyboxTriggers();
});

// Также обновляем при изменении размера окна
window.addEventListener('resize', setupMobileFancyboxTriggers);