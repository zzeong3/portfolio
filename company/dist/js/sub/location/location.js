window.onload = function(){

    //표시할 지역의 경도, 위도, 줌레벨 설정하여 인스턴스 생성
    var mapContainer = document.getElementById('map'); 
    var mapOption = { 
        center: new kakao.maps.LatLng(37.3945468,127.1105309), 
        level: 4  //zoom
    };
    var map = new kakao.maps.Map(mapContainer, mapOption); 



    //좌표값과 마커이미지 갯수만큼 반복을 돌며 마커생성하고 버튼 이벤트 연결
    var markerOptions = [
        {
            title: '본점',
            latlng: new kakao.maps.LatLng(37.3945468,127.1105309),
            button : document.getElementById('branch1')
        },
        {
            title: '지점',
            latlng: new kakao.maps.LatLng(37.5088141,126.8890174),
            button : document.getElementById('branch2')
        }
    ];

    for(var i=0; i<markerOptions.length; i++){
        new kakao.maps.Marker({
            map : map,
            position : markerOptions[i].latlng,
            title : markerOptions[i].title,
        });    

        (function(index){
            markerOptions[index].button.onclick = function(){
                moveTo(markerOptions[index].latlng);
            }
        })(i);        
    }    

    function moveTo(target){
        var moveLatLan = target;
        map.setCenter(moveLatLan);
        return false;
    }
   

    //스카이뷰 컨트롤 표시
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


    //줌 컨트롤 표시
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);


    //드래그기능 활성화
    setDraggable(true);           
    function setDraggable(draggable) {
        map.setDraggable(draggable);    
    }


    //줌기능 활성화
    setZoomable(true);
    function setZoomable(zoomable) {          
        map.setZoomable(zoomable);    
    }



}
