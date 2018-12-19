$(document).ready(function() {

	/*Typing animation for intro screen*/
	var typed = new Typed('#typed', {
    strings: ['leader', 'developer','designer','runner','gamer','transgender'],
    typeSpeed: 75,
    backSpeed: 75,
    backDelay: 3000,
    loop: true
  });

	$('.timeline .event').click(function() {
	  $(this).children('.event-content').children('.event-info').slideToggle();
	});

	$('.exp-bubble').click(function() {
		let parent = $(this).parent();
		parent.toggleClass('exp-expand');
		if(parent.hasClass('exp-expand')) {
			$('html,body').animate({ scrollTop: parent.offset().top - ( $(window).height() - parent.outerHeight(true) ) / 2  }, 500);
		}
	});

	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target.offset().top
		}, 1000, 'swing');
	});

	$(window).scroll(function() {

	  // selectors
	  var $window = $(window),
	      $body = $('body'),
	      $experience = $('.experience');
				$intro = $('.bio');

	  // Change 33% earlier than scroll position so colour is there when you arrive.
	  var scroll = $window.scrollTop() + ($window.height() / 3);


	  $intro.each(function () {
			var $this = $(this);
			var height =  $this.height() / 10;
			if ($this.position().top + $this.height() > scroll + height) {
				$body.removeClass(function (index, css) {
					return (css.match (/(^|\s)back-\S+/g) || []).join(' ');
				});
			}
			else if($this.position().top <= scroll + height) {
	      $body.addClass('back-' + $(this).data('experience'));
			}
		});

	  $experience.each(function () {
	    var $this = $(this);

	    // if position is within range of this panel.
	    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
	    // Remember we set the scroll to 33% earlier in scroll var.
	    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

	      // Remove all classes on body with color-
	      $body.removeClass(function (index, css) {
	        return (css.match (/(^|\s)back-\S+/g) || []).join(' ');
	      });

	      // Add class of currently active div
	      $body.addClass('back-' + $(this).data('experience'));
	    }
	  });

	}).scroll();

	filterSelection("feature", 'project');
	filterSelection('all', 'event');
	highlightActive("project-filters");
	highlightActive("event-filters");

});

function filterSelection(c, className) {
  var x, i;
  x = document.getElementsByClassName(className);
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
function highlightActive(filterName) {
	var btnContainer = document.getElementById(filterName);
	var btns = btnContainer.getElementsByClassName("btn");
	for (var i = 0; i < btns.length; i++) {
	  btns[i].addEventListener("click", function() {
	    var current = btnContainer.getElementsByClassName("active");
	    current[0].className = current[0].className.replace(" active", "");
	    this.className += " active";
	  });
  }
}
