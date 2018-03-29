var IMAGE_PATH = "./Photos/";

// Contains the filenames of all the images used for classification
var imageList = [
	'4KK2_20150823_152106_985',
	'4KK2_20150829_162922_083',
	'4KK2_20150906_172222_214',
	'4KK2_20150910_131804_951',
	'4KK2_20150910_145708_024',
	'4WBR_20150516_112748_501',
	'4WBR_20150516_120057_166',
	'5a9e_20141005_140124_873',
	'5a9e_20141006_102246_788',
	'5a9e_20141007_135000_213',
	'JN34_20150328_181324_374',
	'JN34_20150319_183334_317',
	'J6ZC_20150408_183238_027',
	'J6ZC_20150408_183124_341',
];

var end = imageList.length;


// ----------------------------- MAIN METHOD -----------------------------

$(window).on("load", function() {
  // Please run it with window.onload, not with document.ready

  // THERE MUST BE AN EQUAL NUMBER OF IMAGES IN BOTH STRIPS FOR SMOOTH ANIMATION

  // INITIALIZATION
  // - Read in all images in the image directory
  // - Append slide elements in strip containers
  // - REQUIRES EVEN NUMBER OF IMAGE LIST

  imageList.map((image, index) => {
  	if (index % 2 === 0) {
  		generateImageSlide('.left-block', imageFile(image), image)
  	} else {
  		generateImageSlide('.right-block', imageFile(image), image)
  	}
  });

  // Apply to left strip
  initSmoothScrolling(".left-block", "smoothscrollup", false);

  // Apply to right strip
  initSmoothScrolling(".right-block", "smoothscrolldown", true);

});

// ----------------------------- HELPER FUNCTION -----------------------------
// Create an img DOM element with the src pointing to imagePath.
function generateImageElement(imagePath, imageId) {
	return '<div> <img width="300" height="300" data-image="'+imageId+'" src="'+imagePath+'" onclick=selectImage(this)> </div>';
}


// ----------------------------- HELPER FUNCTION -----------------------------
// Return the relative image path given filename
function imageFile(filename) {
	return IMAGE_PATH + filename + '.jpg';
}

// ----------------------------- CONSTRUCTOR FUNCTION -----------------------------
// Create an image slide element within the strip container.
// - If isFirstIndex, then set a class first
// - Attach EVENT HANDLERS here
function generateImageSlide(container, imagePath, imageId) {
	$(container+'>.animation')
  	.append(generateImageElement(imagePath, imageId))
}

// Remove image from slide and recalculate circular animation
function removeFromSlide(container, imageId) {
	$('.left-block div').empty();
	$('.right-block div').empty();

	imageList = imageList.filter((image => image !== imageId));
	imageList.map((image, index) => {
  	if (index % 2 === 0) {
  		generateImageSlide('.left-block', imageFile(image), image)
  	} else {
  		generateImageSlide('.right-block', imageFile(image), image)
  	}
  });

  // Apply to left strip
  initSmoothScrolling(".left-block", "smoothscrollup", false);

  // Apply to right strip
  initSmoothScrolling(".right-block", "smoothscrolldown", true);
}


// ----------------------------- CONSTRUCTOR FUNCTION -----------------------------
// Begin the sliding animation for elements within container
function initSmoothScrolling(container, animation, isMovingDown) {
  /*
	* @param {String} container Class or ID of the animation container
	* @param {String} animation Name of the animation, e.g. smoothscroll
	*/
  var sliderWidth = $(">div>div:first-of-type", container).outerWidth(false);
  var animationHeight = 0;
  var sliderHeight = 0;

  $(">div>div.cloned", container).remove();

  $(">div>div", container).not('.cloned').each(function() {
    animationHeight += $(this).outerHeight(false);
  });

  // Detect the slider height with appended tail
  $(">div>div", container).not('.cloned').each(function() {
    sliderHeight += $(this).outerHeight(false);
  });

  // detect number of visible slides
  var slidesVisible =
    sliderHeight /
    $(">div>div:first-of-type", container).outerHeight(false);
  slidesVisible = Math.ceil(slidesVisible);

  // count slides to determine animation speed
  var slidesNumber = $(">div>div", container).not('.cloned').length;

  // Greater speed value => slower moving images
  var speed = 45;

  // append the tail
  $(">div>div", container)
    .slice(0, slidesVisible)
    .clone()
    .addClass('cloned')
    .appendTo($(">div", container));


  // set slider dimensions
  $(">div", container).css({ width: sliderWidth, height: sliderHeight });
  // Slides moving down animation
  if (!isMovingDown) {
  	$("#circUp").remove()
  	if($(">div>div", container).length > 2) {
			$(
			  "<style id='circUp' type='text/css'>@keyframes " +
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
			$(">div>div.cloned", container).remove();
		}
	} else {
	  // Slides moving up animation
	  $("#circDown").remove()
	  if($(">div>div", container).length > 2) {
		  $(
		    "<style id='circDown' type='text/css'>@keyframes " +
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
		} else {
			$(">div>div.cloned", container).remove();
		}
	}

  // restart the animation (e.g. for safari & ie)
  var cl = $(container).attr("class");
  $(container)
    .removeClass(cl)
    .animate({ nothing: null }, 1, function() {
      $(this).addClass(cl);
    });
}

// Return the class name of the strip container containing this selected image
function getStripContainer(selectedImage) {
 return selectedImage.parentNode.parentNode.parentNode.className.split(" ")[0];
}

// Brings up modal when clicking image
function selectImage(image) {
	var stripContainer = getStripContainer(image);
	var modal = document.getElementById("modal-container");
	var picture = document.getElementById("picture");
	picture.src = image.src;
	picture.dataset.strip = stripContainer;
	picture.dataset.image = image.dataset.image;
	modal.style.display = "block";
}

// Closes modal
function closeModal() {
	var modal = document.getElementById("modal-container");
	modal.style.display = "none";
}

// Data struct for classifications
var results = [];

// Class button functions
function classifyImage(button) {
	var picture = document.getElementById("picture");
	var source = picture.src.split("/");
	var pictureSource = source[source.length - 1].split(".")[0];
	results.push({category: button.name, file: pictureSource});
	var modal = document.getElementById("modal-container");
	modal.style.display = "none";
	removeFromSlide(picture.dataset.strip, pictureSource);
	console.log(results);
}

