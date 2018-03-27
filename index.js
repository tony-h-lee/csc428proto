$(window).on("load", function() {
  // Please run it with window.onload, not with document.ready

  // THERE MUST BE AN EQUAL NUMBER OF IMAGES IN BOTH STRIPS FOR SMOOTH ANIMATION

  // Apply to left strip
  initSmoothScrolling(".left-block", "smoothscrollup", false);

  // Apply to right strip
  initSmoothScrolling(".right-block", "smoothscrolldown", true);

});

function initSmoothScrolling(container, animation, isMovingDown) {
  /*
	* @param {String} container Class or ID of the animation container
	* @param {String} animation Name of the animation, e.g. smoothscroll
	*/
  var sliderWidth = $(">div>div:first-of-type", container).outerWidth(false);
  var animationHeight = 0;
  var sliderHeight = 0;

  $(">div>div", container).each(function() {
    animationHeight += $(this).outerHeight(false);
  });

  // Detect the slider height with appended tail
  $(">div>div", container).each(function() {
    sliderHeight += $(this).outerHeight(false);
  });

  // detect number of visible slides
  var slidesVisible =
    sliderHeight /
    $(">div>div:first-of-type", container).outerHeight(false);
  slidesVisible = Math.ceil(slidesVisible);

  // count slides to determine animation speed
  var slidesNumber = $(">div>div", container).length;

  // Greater speed value => slower moving images
  var speed = slidesNumber * 4;

  // append the tail
  $(">div>div", container)
    .slice(0, slidesVisible)
    .clone()
    .appendTo($(">div", container));

  // set slider dimensions
  $(">div", container).css({ width: sliderWidth, height: sliderHeight });

  // Slides moving down animation
  if (isMovingDown) {
		$(
		  "<style type='text/css'>@keyframes " +
		    animation +
		    " { 100% { margin-top: 0px; } 0% { margin-top: -" +
		    animationHeight +
		    "px; } } .left-block >div>div:first-of-type " +
		    " { -webkit-animation: " +
		    animation +
		    " " +
		    speed +
		    "s linear infinite; -moz-animation: " +
		    animation +
		    " " +
		    speed +
		    "s linear infinite; -ms-animation: " +
		    animation +
		    " " +
		    speed +
		    "s linear infinite; -o-animation: " +
		    animation +
		    " " +
		    speed +
		    "s linear infinite; animation: " +
		    animation +
		    " " +
		    speed +
		    "s linear infinite; }</style>"
		).appendTo("head");
	} else {
	  // Slides moving up animation
	  $(
	    "<style type='text/css'>@keyframes " +
	      animation +
	      " { 0% { margin-top: 0px; } 100% { margin-top: -" +
	      animationHeight +
	      "px; } } .right-block >div>div:first-of-type " +
	      " { -webkit-animation: " +
	      animation +
	      " " +
	      speed +
	      "s linear infinite; -moz-animation: " +
	      animation +
	      " " +
	      speed +
	      "s linear infinite; -ms-animation: " +
	      animation +
	      " " +
	      speed +
	      "s linear infinite; -o-animation: " +
	      animation +
	      " " +
	      speed +
	      "s linear infinite; animation: " +
	      animation +
	      " " +
	      speed +
	      "s linear infinite; }</style>"
	  ).appendTo("head");
	}

  // restart the animation (e.g. for safari & ie)
  var cl = $(container).attr("class");
  $(container)
    .removeClass(cl)
    .animate({ nothing: null }, 1, function() {
      $(this).addClass(cl);
    });
}
