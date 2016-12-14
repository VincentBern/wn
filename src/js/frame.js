var jQuery = require("jquery");
var $ = jQuery;

function rgbToHex(R,G,B) {
  return toHex(R)+toHex(G)+toHex(B);
};

function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
};

$(document).on("click", "#Convert",  function(){
  var R = $("#Red").val();
  var G = $("#Green").val();
  var B = $("#Blue").val();
  var Result = rgbToHex(R,G,B);

  $("#Result").val("#" + Result);

  $(".col").attr("style", "background-color: #" + Result);
});

var vid = document.getElementById("bgvid"),
pauseButton = document.getElementById("vidpause");
muteButton = document.getElementById("vidmute");
function vidFade() {
    vid.classList.add("stopfade");
}
vid.addEventListener('ended', function() {
    // only functional if "loop" is removed
     vid.pause();
	// to capture IE10
	vidFade();
});

pauseButton.addEventListener("click", function() {
    vid.classList.toggle("stopfade");
	if (vid.paused) {
    vid.play();
		pauseButton.innerHTML = "Pause";
	} else {
    vid.pause();
    pauseButton.innerHTML = "Paused";
	}
});

muteButton.addEventListener("click", function() {
  if (vid.muted) {
    vid.muted = false;
		muteButton.innerHTML = "Mute";
	} else {
    vid.muted = true;
    muteButton.innerHTML = "Unmute";
	}
});

$(document).on("click", "h1", function(){
  var key = $(this).attr("aria-controls");
  
  setTimeout(function () {
    document.getElementById(key).scrollIntoView();
  }, 500);
})
