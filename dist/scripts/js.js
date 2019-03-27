$("#menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = ($(id).offset().top)-135;
        
    $('body,html').animate({scrollTop: top}, 1000);
});
    
$("#mobButton").click(function(){
    $("#menu").toggle()
})

window.addEventListener('resize', function (event) {
    if (document.documentElement.clientWidth < 1000) {
        $("#menu").toggle()
    }
});