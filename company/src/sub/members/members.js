$(document).ready(function(){
    $('#join').on('submit',function(e){
        e.preventDefault(); // 페이지 넘어가는걸 막는것, 원래 쓰지 않아야 한다.
 
        var agreed = $('#terms').is(':checked');
        var len = $('.inp_required').length;
        var pwd = $('#pwd').val();
        var pwdConfirm = $('#pwdConfirm').val();
        var radioGender = $('input[name=gender]').is(':checked');
        var radioPhone = $('input[name=phone]').is(':checked');
        var isRequired = false;
        var isPwd = false;
        var isGender = false;
        var isPhone = false;
        var i = 0;
 
        $('.notice, input').removeClass('invalid');
        $('.msgInvalid').removeClass('on');
        if (!agreed) {
            alert('Agree to the terms and conditions!');
            $('.notice').addClass('invalid');
        }else {
             //필수 텍스트 입력사항 반복문으로 체크
             $('.inp_required').each(function(index){
                 var data = $(this).val();
                 var txt = $(this).attr('placeholder');
 
                 if(!data){
                     alert(txt);
                     $(this).addClass('invalid');
                 }else {
                     i++;

                 }
             });
             if (i==len) {
                 isRequired = true;
             }
 
             //비밀번호 값이 같은지 체크
             if(pwd !== pwdConfirm) {
                 alert('Please enter the same password.');
                 $('#pwd, #pwdConfirm').addClass('invalid'); 
             }else {
                 isPwd = true;
             }
 
             //성별 라디오버튼 체크
             if(!radioGender) {
                 alert('Please select a gender');
                 $('#gender .msgInvalid').addClass('on');
             }else {
                 isGender = true;
             }

             //핸드폰 라디오버튼 체크
             if(!radioPhone) {
                alert('Please select a cell phone');
                $('#phone .msgInvalid').addClass('on');
            }else {
                isPhone = true;
            }
 
             //최종인증처리
             if(isRequired && isPwd && isGender && isPhone) {
                 alert('Sign up is complete.');
                 
                 $('.inp_required').val('');
                 $('#terms').prop('checked',false);//강제로 체크 해제
                 $('input[name=gender]').prop('checked',false);
                 $('input[name=phone]').prop('checked',false);
             }
         }
    })
 });
 
 
