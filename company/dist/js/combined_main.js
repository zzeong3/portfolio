$(document).ready(function(){	
    
    console.log(document.cookie);

    // 처음 로딩시 쿠기가 있으면 팝업을 숨김, 없으면 보임
    var cookiedata = document.cookie;
    
    
    if(cookiedata.indexOf('today=done')<0){
        // 쿠키가 없을때 
        $('aside').show();
    }else {
        // 쿠키가 있을때
        $('aside').hide();
    }

    $('.btn_popup_close').on('click', function(){
        if($('#inp_check').is(':checked')){
            setCookie('today','done',1);
        }
        $('aside').fadeOut();
    });

    //쿠키 삭제버튼 클릭시
    $('.del').on('click', function(){
        setCookie('today','done',0);
    });


    //쿠키생성
    function setCookie(name, value, expiredays){
        var today = new Date();
        var duedate = today.getDate() + expiredays; //해당날짜 + 최종일
        today.setDate(duedate);
        var result = today.toGMTString();
        //today=done; path=/; expires=날짜,시간
        document.cookie = name+'='+value+'; path=/; expires='+result+';'
    }

});
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
$(document).ready(function(){
    /* 상단 슬라이드 */
	init();
	bindingEvent();

	var $wrapVisual, $wrapVisual_ul, $wrapVisual_ul_li, $boxVisual, $boxVisual_ul, $boxVisual_ul_li, $infoVisual, $infoVisual_ul, $infoVisual_ul_li,  $btnPrev, $btnNext, speed, isAnimated;

	function init() {
		$wrapVisual = $('.wrap_visual');
		$wrapVisual_ul = $wrapVisual.children('ul');
		$wrapVisual_ul_li = $wrapVisual_ul.children('li');
		
		$boxVisual = $('.box_visual');
		$boxVisual_ul = $boxVisual.children('ul');
		$boxVisual_ul_li = $boxVisual_ul.children('li');
	
		$infoVisual = $('.info_visual');
		$infoVisual_ul = $infoVisual.children('ul');
		$infoVisual_ul_li = $infoVisual_ul.children('li');

		$btnPrev = $('.box_visual .btn_prev'); 
		$btnNext = $('.box_visual .btn_next');
		speed = 1000;
		isAnimated = true;
	}

	function bindingEvent() {
		$wrapVisual_ul_li.last().prependTo($wrapVisual_ul);
		$boxVisual_ul_li.last().prependTo($boxVisual_ul);
		$infoVisual_ul_li.last().prependTo($infoVisual_ul);
		calcWidth($wrapVisual_ul);
		calcWidth($boxVisual_ul);
		calcWidth($infoVisual_ul);
		
		//next 이벤트
		$btnNext.on('click',function(){
			if (isAnimated){
				isAnimated = false;
				doNext($wrapVisual_ul);
				doNext($boxVisual_ul);
				doNext($infoVisual_ul);
			}	
		})

		//prev 이벤트
		$btnPrev.on('click',function(){
			if (isAnimated){
				isAnimated = false;
				doPrev($wrapVisual_ul);	
				doPrev($boxVisual_ul);
				doPrev($infoVisual_ul);
			}
		})
	}

	function doNext(item){
		item.stop().animate({'margin-left':'-200%'},speed,function(){
			$(this).children('li').first().appendTo(item);
			$(this).css({'margin-left':'-100%'});	
			isAnimated = true;
		})
	}

	function doPrev(item){
		item.stop().animate({'margin-left':'0%'},speed,function(){
			$(this).children('li').last().prependTo(item);
			$(this).css({'margin-left':'-100%'});
			isAnimated = true;
		})	
		
	}

	function calcWidth(item){
		var len = item.children('li').length;
		item.css({'width':(100*len)+'%'});
		item.children('li').css({'width':(100/len)+'%'});
	}
    
})
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