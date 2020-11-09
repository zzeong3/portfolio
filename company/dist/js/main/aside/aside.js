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