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