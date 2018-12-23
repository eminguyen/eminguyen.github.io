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
				$project = $('#projects');

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

		$project.each(function () {
			var $this = $(this);
			if ($this.position().top + $this.height() <= scroll) {
				$body.removeClass(function (index, css) {
					return (css.match (/(^|\s)back-\S+/g) || []).join(' ');
				});
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

var stage = document.getElementById('stage');

	var browserX = window.screenX;
	var browserY = window.screenY;
	var balls = [];
	var total = 15;
	var currentDrag = null;
	var mouseX = 0;
	var mouseY = 0;
	var stageWidth = $(document).width();
	var stageHeight = $(document).height();
	stage.width = stageWidth;
	stage.height = stageHeight;

	var IE = document.all ? true : false;
	if(!IE) document.addEventListener(Event.MOUSEMOVE, getMouseXY, false);
	document.onmousemove = getMouseXY;

	window.onresize = function(event)
	{
		stage.width = 10;
		stage.height = 10;
		stageWidth = $(document).width();
		stageHeight = $(document).height();
		stage.width = stageWidth;
		stage.height = stageHeight;
	}

	generate();
	addIcons();
  addMore();

	var drawingCanvas = document.getElementById('stage');
	if(drawingCanvas.getContext)
	{
		var context = drawingCanvas.getContext('2d');
		setInterval(render, 20);
	}

	jQuery(document).ready(function()
	{
		$(document).mousedown(function(e)
		{
			onMouseDown();
		});

		$(document).mouseup(function(e)
		{
			onMouseUp();
		});
	})

	function onMouseDown()
	{
		var j = balls.length;
		while(--j > -1)
		{
			var dx = mouseX - balls[j].x;
			var dy = mouseY - balls[j].y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if(dist < balls[j].size/2)
			{
				currentDrag = balls[j];
				currentDrag.dragging = true;
				return;
			}
		}
	}

	function onMouseUp()
	{
		if(currentDrag.link) {
		  window.location.href = currentDrag.link;
		}
		if(currentDrag != null) currentDrag.dragging = false;
	}

	function generate()
	{
		for(var i = 0; i < total; i++)
		{
      generateBall();
		}
	}

	function generateBall() {
		var ball = {};
		ball.color = genColor();
		ball.bounce = .5 + (Math.random() * .5);
		ball.vx = Math.random() * 50 - 25;
		ball.vy = Math.random() * 50 - 25;
		ball.size = 100 - (ball.bounce * 50);
		ball.x = Math.random() * stageWidth;
		ball.y = stageHeight;
		balls[balls.length] = ball;
	}

	function addMore(id) {
		clearInterval(id);
		var id = setInterval(function() {
			generateBall();
			if(balls.length > 25) {
				removeSome(id);
			}
		}, 10000);
	}

	function removeSome(id) {
		console.log('clearing');
		clearInterval(id);
		var id = setInterval(function() {
			clearBall();
			if(balls.length <= 15) {
				addMore(id);
			}
		}, 10000);
	}

	function clearBall() {
		balls.splice(4,1);
	}

	function addIcons()
	{
		balls[0].image = 'build/images/linkedin.png';
		balls[0].link = 'https://www.linkedin.com/in/emilyhuongnguyen/';
		balls[1].image = 'build/images/facebook.png';
		balls[1].link = 'https://www.facebook.com/empressily';
		balls[2].image = 'build/images/github.png';
		balls[2].link = 'https://github.com/eminguyen';
		balls[3].image = 'build/images/twitter.png';
		balls[3].link = 'https://twitter.com/TheEmpressEmi';
	}

	function genColor()
	{
		colors = new Array(3)
		colors[0] = '#0ED2F5';
		colors[1] = '#2fddf4';
		colors[2] = '#1bccf4';
		colors[3] = '#36def4';
		return colors[Math.round(Math.random()*3)];
	}

	function render()
	{
		var isChange = (browserX != window.screenX || browserY != window.screenY);
		if(isChange)
		{
			var diffX = browserX - window.screenX;
			browserX = window.screenX;

			var diffY = browserY - window.screenY;
			browserY = window.screenY;
		}

		var j = balls.length;
		while(--j > -1)
		{
			update(balls[j]);

			if(isChange)
			{
				balls[j].vx += (diffX * .05);
				balls[j].vy += (diffY * .1);
			}
		}

		draw();
	}

	function draw()
	{
		context.clearRect(0, 0, stageWidth, stageHeight);
		var i = balls.length;
		while(--i > -1)
		{
			var image = document.createElement('img');
			image.src = balls[i].image;

			context.save();
			context.fillStyle = balls[i].color;
			context.beginPath();
			context.arc(balls[i].x,balls[i].y,balls[i].size, 0, Math.PI * 2, true);
			context.closePath();
			context.fill()
			context.clip();

			context.drawImage(image, (balls[i].x - (balls[i].size/2)), (balls[i].y - (balls[i].size * image.height / image.width)/2), balls[i].size, balls[i].size * (image.height / image.width));

			context.beginPath();
			context.arc(balls[i].x,balls[i].y,balls[i].size, 0, Math.PI * 2, true);
			context.clip();
			context.closePath();
			context.restore();
		}
	}

	function update(ball)
	{
		collisionCheck();

		var gravity = 2;
		var drag = .98;

		if(ball.dragging)
		{
			ball.vx = ball.x - ball.ox;
			ball.vy = ball.y - ball.oy;
			ball.ox = ball.x;
			ball.oy = ball.y;

			ball.x = mouseX;
			ball.y = mouseY;

			if ((ball.x + ball.size) > stageWidth)
			{
				ball.x = stageWidth - ball.size;
			}
			else if((ball.x - ball.size) < 0)
			{
				ball.x = 0 + ball.size;
			}

			if ((ball.y + ball.size) > stageHeight)
			{
				ball.y = stageHeight - ball.size;
			}
			else if((ball.y - ball.size) < 0)
			{
				ball.y = 0 + ball.size;
			}
		}
		else
		{
			ball.x += ball.vx;
			ball.y += ball.vy;

			if ((ball.x + ball.size) > stageWidth)
			{
				ball.x = stageWidth - ball.size;
				ball.vx = -ball.vx * ball.bounce;
			}
			else if((ball.x - ball.size) < 0)
			{
				ball.x = 0 + ball.size;
				ball.vx = -ball.vx * ball.bounce;
			}

			if ((ball.y + ball.size) > stageHeight)
			{
				ball.y = stageHeight - ball.size;
				ball.vy = -ball.vy * ball.bounce;
			}
			else if((ball.y - ball.size) < 0)
			{
				ball.y = 0 + ball.size;
				ball.vy = -ball.vy * ball.bounce;
			}

			ball.vx = ball.vx * drag;
			ball.vy = ball.vy * drag + gravity;
		}
	}

	function collisionCheck()
	{
		var spring = .5;

		for(var i = 0; i < (balls.length-1); ++i)
		{
			var ball0 = balls[i];

			for(var j = i + 1; j < balls.length; ++j)
			{
				var ball1 = balls[j];
				var dx = ball1.x - ball0.x;
				var dy = ball1.y - ball0.y;
				var dist = Math.sqrt(dx * dx + dy * dy);
				var minDist = ball0.size + ball1.size;

				if(dist < minDist)
				{
					var angle = Math.atan2(dy, dx);
					var tx = ball0.x + dx / dist * minDist;
					var ty = ball0.y + dy / dist * minDist;
					var ax = (tx - ball1.x);
					var ay = (ty - ball1.y);


					ball0.x -= ax;
					ball0.y -= ay;

					ball1.x += ax;
					ball1.y += ay;


					ball0.vx -= (ax * spring);
					ball0.vy -= (ay * spring);
					ball1.vx += (ax * spring);
					ball1.vy += (ay * spring);
				}
			}
		}
	}

	function getMouseXY(e)
	{
			if(IE)
			{
				mouseX = event.clientX
				mouseY = event.clientY
			}
			else
			{
				mouseX = e.pageX
				mouseY = e.pageY
			}

			if(mouseX < 0) {mouseX = 0;}
			if(mouseY < 0) {mouseY = 0;}

			return true;
	}
