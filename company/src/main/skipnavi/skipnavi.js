$(document).ready(function(){
    /* 스크롤 */
    var $navi_li = $('#navi li');
    var $bundle = $('section, figure');
    var pos1 = $('#visual').offset().top;
    var pos2 = $('#info').offset().top;
    var pos3 = $('#service').offset().top;
    var pos4 = $('#product').offset().top;
    var pos5 = $('#work').offset().top;
    var base = -700;
    var speed = 1000;

    $(window).on('scroll',function(){
        var scroll = $(this).scrollTop();

        if(scroll >= pos1+base && scroll < pos2+base){
            $navi_li.removeClass('on');
            $navi_li.eq(0).addClass('on');
            $bundle.eq(0).addClass('on');
        }
        if(scroll >= pos2+base && scroll < pos3+base){
            $navi_li.removeClass('on');
            $navi_li.eq(0).addClass('on');
            $bundle.eq(1).addClass('on');
        }
        if(scroll >= pos3+base && scroll < pos4+base){
            $navi_li.removeClass('on');
            $navi_li.eq(2).addClass('on');
            $bundle.eq(2).addClass('on');
        }
        if(scroll >= pos4+base && scroll < pos5+base){
            $navi_li.removeClass('on');
            $navi_li.eq(3).addClass('on');
            $bundle.eq(3).addClass('on');
        }
        if(scroll >= pos5-500){
            $navi_li.removeClass('on');
            $navi_li.eq(4).addClass('on');
            $bundle.eq(4).addClass('on');
        }
    });

    $navi_li.on('click',function(){
        var i = $(this).index();
        var target = $bundle.eq(i).offset().top;		
        $('html,body').stop().animate({scrollTop : target},speed);
        
    });
});