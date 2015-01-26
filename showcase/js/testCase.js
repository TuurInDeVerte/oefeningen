
// set main class & sidebar class to fit window
$(function(){
  $('.sidebar, .main').css({ height: $(window).innerHeight() });
  $(window).resize(function(){
    $('.sidebar, .main').css({ height: $(window).innerHeight() });
  });
});