$(document).ready(function(){
    

    /* 슬라이드 */
    $('.banner_popular ul li').last().prependTo('.banner_popular ul');
    rwd_wid();
    $(window).on('resize', rwd_wid);

    function rwd_wid() {
        var wid = $(this).width();
        
        if(wid>=1180) doBanner(4);
        if(wid>=540 && wid<1180) doBanner(2);
        if(wid<540) doBanner(1);
    }

    function doBanner(num) {
        $('.banner_popular ul').css({marginLeft: (-100/num)+'%'});//스크립트로 변경된 코드 스크립트로 변경
        $('.wrap_popular .btn_prev, .wrap_popular .btn_next').off();//기존 연결함수 지우주기

        $('.wrap_popular .btn_next').on('click', function(e){
            e.preventDefault();
            $('.banner_popular ul').animate({marginLeft : ((-100/num)*2)+'%'},500,function(){
                $(this).children('li').first().appendTo(this);
                $(this).css({marginLeft:(-100/num)+'%'});
            })
        });

        $('.wrap_popular .btn_prev').on('click', function(e){
            e.preventDefault();
            $('.banner_popular ul').animate({marginLeft : '0%'},500,function(){
                $(this).children('li').last().prependTo(this);
                $(this).css({marginLeft:(-100/num)+'%'});
            })
        });
    }
    
    

});