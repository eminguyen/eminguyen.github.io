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
const complete = $('.complete');
randomlyChange();
let randomizer = setInterval(randomlyChange, 5000);

$('.complete').click(function(e) {
  clearInterval(randomizer);
  selected = $(this);
  changeContent();
});

function randomlyChange() {
  selected = $(complete[Math.floor(Math.random()*complete.length)])
  changeContent();
}

function changeContent() {
  let title = selected.html();
  let id = selected.attr('id');
  let image = selected.data().content;
  console.log(selected.data());
  $('#info-header').fadeOut(200, function() {
    $('#info-header').html(title).fadeIn(200);
  });

  $('#info-content').fadeOut(200, function() {
    $('#info-content').html($(`.${id}`).html()).fadeIn(200);
  });

  $('#info-image').fadeOut(200, function() {
    $('#info-image').attr("src",image).fadeIn(200);
  });
}
