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

	$('.projects-but').click(function() {
		$('.projects').slideToggle();
	});

	$('.timeline-but').click(function() {
		$('.experience').slideToggle();
	});

});

filterSelection("feature", 'project');
filterSelection('all', 'event');
highlightActive("project-filters");
highlightActive("event-filters");

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
