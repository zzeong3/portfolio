$(document).ready(function(){

	// 브라우저 로딩시 rwd호출
    rwd();

    //브라우저가 리사이즈 될때마다 rwd()호출
    $(window).on('resize',function(){
       rwd();
	});
	


	function rwd(){
		/* PC gnb */
		var $header = $('#header');
		var $wrap_gnb = $('#header .wrap_gnb');
		var $gnb = $('#gnb');
		var $gnb_li = $gnb.children('li');
		var $gnb_li_a = $gnb_li.children('a');
		var $gnb_li_ul = $gnb_li.children('ul');

		var ht_max = 0;
		var ht_header = $header.height();
		var speed = 1000;
		var doneClose = true;
	
	
		if($(window).width() > 1179) {

			getSubMaxHeight();

			//gnb영역에 마우스 오버시 2depth. bgGnb 보임
			$wrap_gnb.on('mouseenter',openSub);    

			//gnb영역에 마우스 아웃시 2depth, bgGnb안보임
			$wrap_gnb.on('mouseleave', closeSub);  

			//gnb 1depth a태그에 포커스(탭키) 이벤트 연결   
			$gnb_li_a.on('focusin',openSub);    
			$gnb_li.last().find('a').last().on('focusout',closeSub);	
			
			//1depth메뉴 활성화 유지    
			$gnb_li.on('mouseenter',function(){
				$(this).children('a').addClass('on');
			});
			$gnb_li.on('mouseleave',function(){
				$(this).children('a').removeClass('on');
			});

			function getSubMaxHeight(){
				$gnb_li.each(function(i){
					var current_ht = $(this).children('ul').height();
					ht_max = Math.max(ht_max, current_ht);    		
				});       
			}

			function openSub(){
				var isBgGnb = $('.bgGnb').length;

				if(!isBgGnb){
					$wrap_gnb.prepend(
						$('<div class="bgGnb">').css({
							width:'100%', height:ht_max,
							backgroundColor:'rgba(147, 108, 83, 0.4)',
							position:'absolute', top:ht_header, left:'0%',
							display:'none'
						})
					);
				}  
				
				if(doneClose){
					doneClose = false;
					$gnb_li_ul.stop().slideDown(speed);
					$('.bgGnb').stop().slideDown(speed);
				}
				
			}

			function closeSub(){
				$gnb_li_ul.slideUp(speed-300);
				$('.bgGnb').slideUp(speed,function(){
					$(this).remove();
					doneClose = true;
				});
			}
			
		} else {
			$wrap_gnb.off('mouseenter' ,openSub);   
			$wrap_gnb.off('mouseleave', closeSub);  
			$wrap_gnb.off('mouseenter');   
			$wrap_gnb.off('mouseleave');
			$gnb_li.off('mouseenter');
			$gnb_li.off('mouseleave');
			


		}
	}	
	
	
	/* 모바일 메뉴 버튼 */
	$('.btn_close').on('click', function(){
	if($('#header').hasClass('open')) {
		$('#header').removeClass('open');
		$('body').removeAttr( 'style' );
		} else {
		$('#header').addClass ('open');
		$('body').css({overflow:'hidden'});
		}
	}); 
	
	
});