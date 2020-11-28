// var token = "JWT " + window.sessionStorage.token;
console.log(url_ip);

$(function () {
	var tid;
	var map = new BMap.Map("map");
	// 创建地图实例  
	var point = new BMap.Point(116.461652,39.925717);
	// 创建点坐标  
	map.centerAndZoom(point,19);
	// 初始化地图，设置中心点坐标和地图级别 
	map.enableScrollWheelZoom(); 
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	$('.adress').click(function () {
		$('.map').css({opacity:1,zIndex:2});
		tid = setTimeout(function(){
		    map.zoomTo(12); 
		},3000);
	})
	$('.close_map').click(function () {
		clearTimeout(tid)
		$('.map').css({opacity:0,zIndex:-1});
		map.zoomTo(19);
	})
})