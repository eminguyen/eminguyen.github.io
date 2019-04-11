let fixmeTop = $('.info').offset().top - ($(window).height() * .5 - $(window).width() * .25);
let bottom = $('#bucket-list').offset().top + $('#bucket-list').outerHeight(true) - ($(window).height() * .5 - $(window).width() * .25);
console.log(bottom)

$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();

    if (currentScroll >= fixmeTop) {
      console.log(currentScroll + $(window).height())
      if(currentScroll + $(window).height() >= bottom) {
        $('.info').attr('id', 'bottom');
        console.log('ok')
      }
      else {
        $('.info').attr('id', 'fix-it');
      }
    } else {
        $('.info').attr('id', '');
    }
});
