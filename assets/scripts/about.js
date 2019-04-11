let fixmeTop = $('.info').offset().top - ($(window).height() * .5 - $(window).width() * .25);
let bottom = $('#bucket-list').offset().top + $('#bucket-list').outerHeight(true) - ($(window).height() * .5 - $(window).width() * .25);
console.log(bottom)

$(window).scroll(function() {
  var currentScroll = $(window).scrollTop();

  if (currentScroll >= fixmeTop) {
    if(currentScroll + $(window).height() >= bottom) {
      $('.info').attr('id', 'bottom');
    }
    else {
      $('.info').attr('id', 'fix-it');
    }
  } else {
      $('.info').attr('id', '');
  }
});

let selected;

$('.complete').click(function(e) {
  selected = $(this);
  changeContent();
});

function changeContent() {
  let title = selected.html();
  let id = selected.attr('id');
  $('#info-header').fadeOut(200, function() {
    $('#info-header').html(title).fadeIn(200);;
  });

  $('#info-content').fadeOut(200, function() {
    $('#info-content').html($(`.${id}`).html()).fadeIn(200);;
  });
}
