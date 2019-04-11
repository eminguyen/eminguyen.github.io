let fixmeTop = $('.info').offset().top - ($(window).height()/2 - $(window).width()/5);

$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();

    if (currentScroll >= fixmeTop) {
        $('.info').attr('id', 'fix-it');
    } else {
        $('.info').attr('id', '');
    }

});
