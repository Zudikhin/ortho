$(document).ready(function() {
  "use strict";

  $(".header_main_right_burger").click(function() {
    $(".dropdown").addClass("active");
  });

  $(".dropdown_close").click(function() {
    $(".dropdown").removeClass("active");
  });

  $('.slider_main').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToScroll: 1
  });

  $(".header_main_right_search input").on('focus', function() {
    $(".header_main_right_search").addClass("active");
  });

  $(".header_main_right_search input").on('blur', function() {
    $(".header_main_right_search").removeClass("active");
  });

  // мобильное меню 
  $(function () {
    const $dropdown = $('.dropdown');
    const $panels = $dropdown.find('.menu-panel');

    // стек панелей (путь)
    const stack = ['root'];

    function showPanel(id) {
      $panels.removeClass('is-active is-prev');

      $panels.filter('[data-panel="' + id + '"]').addClass('is-active');

      if (stack.length > 1) {
        const prevId = stack[stack.length - 2];
        $panels.filter('[data-panel="' + prevId + '"]').addClass('is-prev');
      }
    }

    function resetMenu() {
      stack.length = 0;
      stack.push('root');
      showPanel('root');
    }

    // старт
    resetMenu();

    // ВПЕРЕД: открыть панель по data-open
    $dropdown.on('click', 'a[data-open]', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const id = $(this).data('open');
      if (!id) return;

      // если панели нет — ничего не делаем
      if (!$panels.filter('[data-panel="' + id + '"]').length) return;

      stack.push(id);
      showPanel(id);
    });

    // НАЗАД
    $dropdown.on('click', '.menu-back', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (stack.length <= 1) return;
      stack.pop();
      showPanel(stack[stack.length - 1]);
    });

    // ЗАКРЫТЬ (крестик) + сброс на root
    $dropdown.on('click', '.dropdown_close', function () {
      resetMenu();

      // если у тебя есть класс открытия меню — добавь/убери его тут
      // $dropdown.removeClass('is-open');
    });

    // (опционально) если нужно закрывать по ESC
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        resetMenu();
        // $dropdown.removeClass('is-open');
      }
    });
    
  });

  if ($("select").length) {
    $("select").niceSelect();
  }

  $(document).ready(function(){
    $('.input_file input[type="file"]').on('change', function(){
      let fileName = this.files[0]?.name || 'Загрузить фото/видео';
      $(this).siblings('span').text(fileName);
    });
  });

  // Открытие модального окна товар в корзине 
  $(document).on('click', '.buy_btn', function (e) {
    e.preventDefault();
    $('#addCart').modal('show');
  });

  function initSliders() {
    $('.slider').each(function () {
      var $section = $(this);
      var $track   = $section.find('.slider_wrap');
      var $prev    = $section.find('.slider_arrows_prev');
      var $next    = $section.find('.slider_arrows_next');

      if ($track.hasClass('slick-initialized')) return;

      $track.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        adaptiveHeight: true,
        speed: 350,
        responsive: [
          {
            breakpoint: 1200,   // <1200
            settings: { slidesToShow: 2 }
          },
          {
            breakpoint: 768,    // <768
            settings: { slidesToShow: 1 }
          }
        ]
      });

      // кастомные стрелки (внутри конкретной секции)
      $prev.off('click.slickNav').on('click.slickNav', function (e) {
        e.preventDefault();
        $track.slick('slickPrev');
      });

      $next.off('click.slickNav').on('click.slickNav', function (e) {
        e.preventDefault();
        $track.slick('slickNext');
      });
    });
  }

  initSliders();

  $('.modal_customer').slick({
    slidesToShow: 2,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: $('.modal_customer_arrows_prev'),
    nextArrow: $('.modal_customer_arrows_next'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  // открытие в фильтре блоков 
  $(".smart-filter-parameters-box-title").click(function() {
    $(this).parent().toggleClass("bx-active");
    $(this).parent().find(".smart-filter-block").slideToggle();
  });

  $(".catalog_title_filter").click(function() {
    $(this).toggleClass("active");
    $(".catalog_aside").slideToggle();
  });

  $('.history_stage_slider').slick({
    slidesToShow: 1,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: $('.history_stage_arrows_prev'),
    nextArrow: $('.history_stage_arrows_next')
  });

  $('.sertificate_item').on('click', function () {
    var srcImg = $(this).find("img").attr('src')
    $('#imageModal img').attr('src', srcImg);
    $('#imageModal').modal('show');
  });

  $(".schedule_title_choice_item").click(function() {
    var id = $(this).attr("data-target");
    $(".schedule_title_choice_item").removeClass("active");
    $(this).addClass("active");
    $(".schedule_toggle").removeClass("active");
    $(`#${id}`).addClass("active");
  });

});