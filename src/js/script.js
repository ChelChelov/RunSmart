// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 500,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></img></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></img></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//       });
//   });

//Slider

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    speed: 900,
    responsive: {
        320: {
            edgePadding: 20,
            gutter: 20,
            items: 1,
            nav: true,
            navPosition: "bottom"
        },
        992: {
            nav: false
        }
    }
  });

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
}); 

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
}); 

//Tabs

$(document).ready(function() {
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    });
    // $('.button_mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('fast');
    // });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');           
        })
    });

    //Validation
    
    function validateForms(form) {
        $(form).validate({
            rules: {
              // simple rule, converted to {required:true}
              name: {
                required: true,
                minlength: 2
              },
              phone: "required",
              // compound rule
              email: {
                required: true,
                email: true
              }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите Ваше имя",
                    minlength: jQuery.validator.format("Имя должно содержать хотя бы {0} символа")
                  },
                phone: "Пожалуйста введите Ваш номер телефона",
                email: {
                  required: "Пожалуйста введите Ваш email",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $("input[name=phone]").mask("+38 (999) 999-99-99");

    //Mailer

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('fast');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600 && $(this).scrollTop() < 6580) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();  
        }
    });

    //WOW

    wow = new WOW(
        {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       false,       // default
        live:         true        // default
      }
      )
      wow.init();
});
