$(document).ready(function () {
    $('.menu ul li:has(ul)').click(function(e){
        e.preventDefault;

        if($(this).hasClass('activado')){
            $('.menu ul li ul li').css("margin-top","0px");
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
            
        }
        else{
            $('.menu ul li ul li:nth-child(1)').css("margin-top","3px");
            $('.menu ul li ul').slideUp();
            $('.menu ul li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();
        }
    });
});