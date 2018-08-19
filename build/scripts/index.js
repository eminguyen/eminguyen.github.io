$(document).ready(function() {

	/*Typing animation for intro screen*/
	var typed = new Typed('#typed', {
    strings: ['leader', 'developer','designer','runner','gamer','transgender'],
    typeSpeed: 75,
    backSpeed: 75,
    backDelay: 3000,
    loop: true
  });

	$('.timeline .event').hover(function() {
	  $(this).children('.event-content').children('.event-info').slideToggle();
	})

});
