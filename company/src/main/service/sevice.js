/* 탭메뉴 */
$(document).ready(function(){	
    $('.visual_service dt a').on('click focusin', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        
        $('.visual_service dd').hide().removeClass('on');
        $(target).show();
        setTimeout (function(){
            $('.visual_service dd .bg_service').addClass('on');
        },100);

        $('.visual_service dt a').removeClass('on');
        $(this).addClass('on');
    });	
});	