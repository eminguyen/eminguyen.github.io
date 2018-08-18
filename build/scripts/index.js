$(document).ready(function() {

	/*Typing animation for intro screen*/
	var typed = new Typed("#typed", {
    strings: ['leader', 'developer','designer','runner','gamer','transgender'],
    typeSpeed: 75,
    backSpeed: 75,
    backDelay: 3000,
    loop: true
  });

	var accordions = document.querySelectorAll("button.accordion");
	for (var i = 0; i < accordions.length; i++) {
	  accordions[i].onclick = function(){
	    this.classList.toggle("active");
	    this.nextElementSibling.classList.toggle("show");
	  }
	}

});
