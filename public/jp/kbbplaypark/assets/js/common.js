(function ($) {
  'use strict';

  let vToken;

// PC/SP判定
// スクロールイベント
// リサイズイベント
// スムーズスクロール

  /* ここから */
  var break_point = 750;//ブレイクポイント
  var mql = window.matchMedia('screen and (max-width: '+break_point+'px)');//、MediaQueryListの生成
  var deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP


  // リサイズイベント
  var checkBreakPoint = function (mql) {
    deviceFlag = mql.matches ? 1 : 0;// 0 : PC ,  1 : SP
    // → PC
    if (deviceFlag == 0) {
    } else {
      // →SP
    }
    deviceFlag = mql.matches;
  }

  // ブレイクポイントの瞬間に発火
  mql.addListener(checkBreakPoint);//MediaQueryListのchangeイベントに登録

  // 初回チェック
  checkBreakPoint(mql);


/* get url
------------------------------*/
var pagePath = location.pathname,
    pageDir = pagePath.substring(0, pagePath.lastIndexOf('/')) + '/',
    pageHash = location.hash,
    domain = window.location.protocol + '//' + window.location.host,
    pageParam = (new URL(document.location)).searchParams;

function getParam(name, url) {
  if(!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

(function() {
  var navList = $('.c-pp-header .nav li');

  navList.each(function() {
    var href = $(this).find('a').attr('href'),
        path = href.replace(domain, ''),
        dir = path.substring(0, path.lastIndexOf('/')) + '/';

    if (pagePath == '/jp/kbbplaypark/' || pageDir.indexOf('recipe')!== -1) {
      navList.eq(0).addClass('is-active');
    } else {
      navList.eq(0).removeClass('is-active');
      if (pageDir.indexOf('pro')!== -1) {
        navList.eq(1).addClass('is-active');
      } else if (!pageDir.indexOf(dir)) {
        $(this).addClass('is-active');
      }
    }
  });
}());

(function() {
  $('.c-mp-sidebar li').each(function(i) {
    var href = $(this).find('a').attr('href'),
        path = href.replace(domain, ''),
        dir = path.substring(0, path.lastIndexOf('/')) + '/';

    if (pageDir.indexOf('information') !== -1) {
      if (i === 0) {
        $(this).addClass('is-active');
      }
    } else if (pageDir.indexOf('logid') !== -1) {
      if (i === 1) {
        $(this).addClass('is-active');
      }
    } else if (pageDir.indexOf('password') !== -1) {
      if (i === 1) {
        $(this).addClass('is-active');
      }
    } else if (!pageDir.indexOf(dir)) {
      $(this).addClass('is-active');
    }
  });
}());


(function() {

  var param = location.search;
  $('.c-pp-nav-sub li').each(function(i, ele) {
    if(pageDir == "/jp/kbbplaypark/recipe/"){
      var name = $(ele).text()
      if(param.indexOf('category_code') !== -1 && name == "カテゴリー") {
        $(ele).addClass('is-active');
      } else if(param.indexOf('series_id') !== -1 && name == "連載") {
        $(ele).addClass('is-active');
      } else if(param.indexOf('member_id') !== -1 && name == "メンバー") {
        $(ele).addClass('is-active')
      } else if(param === '' && name == "おすすめ") {
        $(ele).addClass('is-active')
      }

    }else{
      var href = $(this).find('a').attr('href'),
          path = href.replace(domain, ''),
          dir = path.substring(0, path.lastIndexOf('/')) + '/';

      if (pageDir === dir) $(this).addClass('is-active');
    }

  });
}());


/* smooth scroll
------------------------------*/
var scrollSpeed = 500;

$(function(){
  $('a[href*="#"]').each(function() {
    var href = $(this).attr('href'),
        path = href.replace(domain, ''),
        dir = path.substring(0, path.lastIndexOf('/')) + '/',
        hash = href.match(/#.+$/);
    // 完全一致したらhrefをハッシュのみにする
    if (hash && pageDir === dir) {
      $(this).attr('href', hash);
    }
  });

  if (pageHash) { $('body,html').stop().scrollTop(0); }
});

$(window).on('load',function(){
  /* smooth scroll on current page */
  $('a[href^="#"]').on('click', function () {
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top;
    $('body,html').stop().animate({scrollTop: position}, scrollSpeed, 'swing');

    return false;
  });

  /* smooth scroll on other page */
  // リロード・ブラウザバックを除く
  if (window.performance.navigation.type === 0) {
    if (pageHash) {
      setTimeout(function(){
        var position = $(pageHash).offset().top;
        $('body,html').stop().animate({scrollTop:position}, scrollSpeed, 'swing');
      }, 200);
    }
  }
});


/* float header
------------------------------*/
(function() {
  const wrapper = $('#wrapper');
  const header = $('.l-header-area');
  const subMenu = $('.c-pp-nav-sub');
  let scrollTop, _scrollTop, headerH, subMenuH, menuPos;

  $(window).on('load resize', function() {
    headerH = header.outerHeight();
    subMenuH = subMenu.outerHeight();
    menuPos = subMenuH ? headerH - subMenuH : headerH;
    // wrapper.css('padding-top', headerH);
  });

  $(window).on('load scroll', function() {
    _scrollTop = $(this).scrollTop();
    if (!_scrollTop) {return;}
    if (_scrollTop > scrollTop) {
      if (_scrollTop > subMenuH) {
        subMenu.addClass('is-hidden');
      }
    } else {
      subMenu.removeClass('is-hidden');
    }
    if (_scrollTop > subMenuH) {
      subMenu.addClass('has-border');
    } else {
      subMenu.removeClass('has-border');
    }
    scrollTop = _scrollTop;
  });
}());


/* float btn
------------------------------*/
(function() {
  if ($('.c-btn-float')[0]) {
    let btn = $('.c-btn-float'),
    box = $('.c-pp-footer');

    $(window).on('scroll', function() {
      let boxTop = box.offset().top;
      let scrollTop = $(this).scrollTop();
      let scrollBottom = scrollTop + $(this).height();
      if ( scrollBottom > boxTop) {
        btn.addClass('is-hidden');
      } else {
        btn.removeClass('is-hidden');
      }
    });
  }
}());


/* menu
------------------------------*/
let scrollTop = 0;
function stopScroll() {
  scrollTop = $(window).scrollTop();
  $('html').addClass('is-fixed').css('top', -scrollTop);
}
function stopScrollOff() {
  $('html').removeClass('is-fixed').removeAttr('style');
  $(window).scrollTop(scrollTop);
}

(function() {
  $('body').prepend('<div id="cover-bg"></div>');

  const menu = $('.c-pp-menu');
  const menuBtn = $('.c-menu-btn');
  const coverBg = $('#cover-bg');

  let deg = 0;

  function menuClose() {
    menuBtn.removeClass('is-open');
    menu.removeClass('is-open');
    coverBg.removeClass('is-open');
    stopScrollOff();
  }
  function menuOpen() {
    menuBtn.addClass('is-open');
    menu.addClass('is-open').scrollTop(0);
    coverBg.addClass('is-open');
    stopScroll();
  }

  menuBtn.on('click', function(){
    if ($(this).hasClass('is-open')) {
      menuClose();
    } else {
      menuOpen();
    }

    deg += 180;
    $(this).children('.inn').css('transform','rotate(' + deg + 'deg)');
    return false;

  });

  coverBg.on('click', function(){
    menuClose();
  });
}());


/* mypage menu
------------------------------*/
(function() {
  const menu = $('.c-mp-sidebar .inner');
  const menuBtnOpen = $('.c-mp-sidebar .toggle.open');
  const menuBtnClose = $('.c-mp-sidebar .toggle.close');

  function menuClose() {
    menu.removeClass('is-open');
    stopScrollOff();
  }
  function menuOpen() {
    menu.addClass('is-open').scrollTop(0);
    stopScroll();
  }

  menuBtnOpen.on('click', function(){
    menuOpen();
  });
  menuBtnClose.on('click', function(){
    menuClose();
  });

}());


/* slider
------------------------------*/

(function() {
  if ($('.c-list-banner02')[0]) {
    $('.c-list-banner02').each(function(){
      var prev = $(this).closest('.c-list-item-area').find('.swiper-button-prev').get(0);
      var next = $(this).closest('.c-list-item-area').find('.swiper-button-next').get(0);
      const mySwiper = new Swiper(this, {
        slidesPerView: 'auto',
        spaceBetween: 8,
        grabCursor: true,
        roundLengths: true,
        freeMode: {
          enabled: true,
          // momentum: false,
        },
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        breakpoints: {
          751: {
            spaceBetween: 20,
          }
        },
      });
    })
  }
}());

(function() {
  if ($('.c-list-item')[0]) {
    $('.c-list-item').each(function(){
      var prev = $(this).closest('.c-list-item-area').find('.swiper-button-prev').get(0);
      var next = $(this).closest('.c-list-item-area').find('.swiper-button-next').get(0);
      const mySwiper = new Swiper(this, {
        slidesPerView: 'auto',
        spaceBetween: 8,
        grabCursor: true,
        roundLengths: true,
        freeMode: {
          enabled: true,
          // momentum: false,
        },
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        breakpoints: {
          751: {
            spaceBetween: 12,
          }
        },
      });
    })
  }
}());

(function() {
  const $listVisual = $('.c-list-visual');
  if ($listVisual[0]) {
    const mySwiper = new Swiper($listVisual, {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 8,
      grabCursor: true,
      loop: true,
      roundLengths: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        waitForTransition: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        751: {
          spaceBetween: 20,
        }
      },
    });
  }
}());

(function() {
  if ($('.c-trouble-visual')[0]) {
    const mySwiper = new Swiper('.c-trouble-visual .ttl-slider', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        waitForTransition: false,
      },
      allowTouchMove: false,
    });
  }
}());


/* logoSlider
------------------------------*/
(function() {
  const $logoSlider = $('.c-tagballoon-list');
  if ($logoSlider[0]) {
    $logoSlider.find('li').clone().appendTo($logoSlider);
    let slideNum = $logoSlider.find('li').length;
    let animDuration = slideNum * 1;

    function runLogoSlider(){
      if (deviceFlag) {
        $logoSlider.css({
          'animation-duration': '',
          'animation-name': ''
        });
      } else {
        $logoSlider.css({
          'animation-duration': animDuration + 's',
          'animation-name': 'tagSlider'
        });
      }
    }

    window.addEventListener('load', runLogoSlider);
    window.addEventListener('resize', runLogoSlider);
  }
}());


/* link (data-href)
------------------------------*/
(function() {
  $('[data-href]').on('click', function(){
    window.location = $(this).attr('data-href');
  });
  $('[data-href] a').on('click', function(e){
    e.stopPropagation();
  });
}());


/* mypage close-btn
------------------------------*/
(function() {
  $('.p-mypage .close-btn').on('click', function(){
    window.close();
  });
}());


/* modal
------------------------------*/
(function() {
  $('.c-mp-modal').on('click', function(){
    $(this).removeClass('is-open');
    if (!$('.c-pp-menu').hasClass('is-open')) {
      stopScrollOff();
    }
  });
  $('.c-mp-modal .cancel').on('click', function(){
    $('.c-mp-modal').removeClass('is-open');
    if (!$('.c-pp-menu').hasClass('is-open')) {
      stopScrollOff();
    }
  });
  $('.c-mp-modal .modal-box').on('click', function(e){
    e.stopPropagation();
  });
}());

(function() {
  $('.c-modal').on('click', function(){
    $(this).removeClass('is-open');
    if (!$('.c-pp-menu').hasClass('is-open')) {
      stopScrollOff();
    }
  });
  $('.c-modal .cancel').on('click', function(){
    $('.c-modal').removeClass('is-open');
    if (!$('.c-pp-menu').hasClass('is-open')) {
      stopScrollOff();
    }
  });
  $('.c-modal .modal-box').on('click', function(e){
    e.stopPropagation();
  });
}());

(function() {
  $('[data-modal-target]:not(#js-changeButton)').on('click', function(){
    var target = $(this).data('modal-target');
    $(target).addClass('is-open');
    stopScroll();
  });
}());


/* mypage password
------------------------------*/
(function() {
  $('.c-mp-input-password .btn').on('click', function(){
    if ($(this).hasClass('is-off')) {
      $(this).next().attr('type', 'password');
      $(this).removeClass('is-off');
    } else {
      $(this).next().attr('type', 'text');
      $(this).addClass('is-off');
    }
  });
}());



/* mypage profile edit counter
------------------------------*/
(function() {
  if ($('.js-counter')[0]) {
    $(window).on('load' , function(){
      $('.js-counter').each(function() {
        var count = $(this).val().length;
        if ($(this).parent('.wrap')[0]) {
          var show = $(this).parent('.wrap').find($('.show-count'));
        } else {
          var show = $(this).closest('.c-pp-form-box').find($('.show-count'));
        }
        $(show).text(count);
      })
    });
    $('.js-counter').on('input' , function(){
      var count = $(this).val().length;
      if ($(this).parent('.wrap')[0]) {
        var show = $(this).parent('.wrap').find($('.show-count'));
      } else {
        var show = $(this).closest('.c-pp-form-box').find($('.show-count'));
      }
      $(show).text(count);
    });
  }
}());

/* mypage profile edit change image
------------------------------*/
(function() {
  if ($('.change-button')[0]) {
    $('.change-button').on('click', function(){
      $('input[type="file"]').click();
    });
    $('.change-image').on('change', function (e) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.thumbnail span').css("background-image", "url('" + e.target.result + "')");
      }
      reader.readAsDataURL(e.target.files[0]);
    });
  }
}());


/* c-btn-favorite
------------------------------*/

(function() {
  if ($('.c-btn-favorite')[0]) {
    $('.c-btn-favorite').on('click', function(){
      if ($('.c-btn-favorite').hasClass('is-off')) {
        $(this).removeClass('is-off');
      }
    });
  }
}());


/* c-select-filter
------------------------------*/

(function() {
  if ($('.c-select-filter')[0]){
    $(document).on('click', function(e) {
      if(!$(e.target).closest('.c-select-filter')[0]) {
        $('.c-select-filter').removeClass('is-open');
      } else {
        $(e.target).closest('.c-select-filter').toggleClass('is-open');
      }
    });
    $('.c-select-filter li').on('click', function() {
      let value = $(this).text();
      $(this).closest('.c-select-filter').find('.field').text(value);
      $(this).addClass('is-selected').siblings().removeClass('is-selected');
    });
  }
}());


})(jQuery);
