$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 500,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></img></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });
  });