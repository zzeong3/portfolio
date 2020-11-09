$(document).ready(function(){	
    var $wrap = $('.wrap_gallery');
    var url_interest = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    var key = 'b0df1caf2be4e4a4a3efd41e6897ef7b';
    var page_num = 1;
    var per_page = 10;
    var btn_num = Math.ceil(500/per_page);
    var tags = '';
    var iso;
    var url = url_interest;


    //처음 로딩시 interest 이미지 출력
    call_data(url, key, page_num, per_page);


    //검색 버튼 클릭시 검색어를 넣어서 검색 이미지 출력
    $('.gallery .btn_search').on('click',function(e){
        e.preventDefault();
        url = url_search;
        tags = $('#search').val();
        page_num = 1;

        $('.paging a').removeClass('on');
        $('.paging a').eq(0).addClass('on');

        call_data(url, key, page_num, per_page, tags);
    });


    //페이징 버튼 클릭시
    $('.paging a').on('click',function(e){
        e.preventDefault();

        page_num = $(this).index()+1;
        call_data(url, key, page_num, per_page, tags);

        $('.paging a').removeClass('on');
        $(this).addClass('on');
    })


    $('body').on('click', 'article a', function(e){
    e.preventDefault();
    $('body').css({overflow:'hidden'});
    var imgSrc = $(this).attr('href');
    $('body')
        .append(
            $('<aside>')
                .append(
                    $('<img>').attr('src',imgSrc)
                )
                .append(
                    $('<span class="pop_close">').text('close')
                )
                .fadeIn(1000)
        )
   });

   $('body').on('click','aside', function(){
    $('body').removeAttr( 'style' );
    $('aside').fadeOut(1000, function(){
            $(this).remove();
        });    
   });


    //데이타 호출함수
    function call_data(url, key, page_num, per_page, tags){
        $.ajax({
            url : url,
            dataType : 'json',
            data : {
                api_key :key,
                page : page_num,
                per_page : per_page,
                tags : tags,
                tagmode : 'any',
                privacy_filter : 5,
                format : 'json',
                nojsoncallback : 1
            }
        })
        .success(function(data){     
            create_dom(data);
        })
        .error(function(){
            alert('Fail to Load Data!!!');
        });
    }


    //DOM 생성함수
    function create_dom(data){
        $('.wrap_gallery').removeClass('on');
        $wrap.empty();

        var item = data.photos.photo;
        //console.log(item);

        $(item).each(function(){
            var farm = this.farm;
            var server = this.server;
            var imgId = this.id;
            var imgSec = this.secret;
            var title = this.title;

            var a_href = 'https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_b.jpg';
            var img_src = 'https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_m.jpg';
            

            $wrap
                .append(
                $('<div class="box">')
                    .append(
                    $('<article>')
                        .append(
                        $('<a>').attr({
                            href : a_href
                            })
                            .append(
                                $('<span class="thumb">')
                                .append(
                                    $('<img>').attr({src : img_src
                                    })
                                )     
                            )
                        )
                        .append(
                        $('<div class="info">')
                            .append(
                            $('<strong>')
                                .append(
                                $('<span class="txt">').text('SubTitle') 
                                )
                                .append(
                                $('<span>').text(title) 
                                )
                            )
                        )
                    )
                        
                )
                .append(
                $('<div class="box type2">')
                    .append(
                    $('<article>')
                        .append(
                        $('<a>').attr({
                            href : a_href
                            })
                            .append(
                                $('<span class="thumb">')
                                .append(
                                    $('<img>').attr({src : img_src 
                                    })
                                )     
                            )
                        )
                        .append(
                        $('<div class="info">')
                            .append(
                            $('<strong>')
                                .append(
                                $('<span class="txt">').text('LIFESTYLE') 
                                )
                                .append(
                                $('<span>').text(title) 
                                )
                            )
                            .append(
                            $('<p>').text('Here comes content description in detail  Here comes content description in detail 1')    
                            )
                        )
                    )         
                )
                .append(
                $('<div class="box type3">')
                    .append(
                    $('<article>')
                        .append(
                        $('<a>').attr({
                            href : a_href
                            })
                            .append(
                                $('<span class="thumb">')
                                .append(
                                    $('<img>').attr({src : img_src 
                                    })
                                )     
                            )
                        )
                        .append(
                        $('<div class="info">')
                            .append(
                            $('<strong>')
                                .append(
                                $('<span class="txt">').text('ABOUT') 
                                )
                            )
                            .append(
                            $('<p>').text('Here comes content description in detail  Here comes content description in detail 1')    
                            )
                        )
                    )         
                )

            //돔이 생성될떄까지 0.6초 뒤에 isotope적용
            //다시 isotope이 적용되고 0.4초뒤에 화면 보임
            setTimeout(function(){
                iso_layout('.wrap_gallery'); 

                setTimeout(function(){
                    $('.wrap_gallery').addClass('on');
                },300);
            },500);  
            
        }); 
    }


    //isotope 함수
    function iso_layout(target){
        iso = new Isotope( target, {     
            itemSelector: '.box'  ,
            columnWidth : '.box',
            transitionDuration: '0.8s',
            percentPosition : true               
        }); 
    }
    
});




