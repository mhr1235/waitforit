/*(function ($) {
  $(function () {

    

  });
})(jQuery);*/

var x = window.matchMedia("(orientation:portrait)")

if (x.matches) { // If media query matches
      var myDiv = $("html, body");
var scrollto = myDiv.offset().top + (myDiv.height() / 8);
myDiv.animate({ scrollTop:  scrollto});
  } else {
     var myDiv = $("html, body");
var scrollto = myDiv.offset().top + (myDiv.height() / 4);
myDiv.animate({ scrollTop:  scrollto});
  }
 $(document).ready(function() {


            
                /*$("html, body").animate({
                    scrollTop: $(
                      'html, body').get(0).scrollHeight
                }, 2000);*/


            
        });
