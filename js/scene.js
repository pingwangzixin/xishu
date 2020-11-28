$(function () {
	$('.toback').click(function () {
		window.history.back()
	})
// 	var tid = setInterval(function () {
// 		var time = Number($('.countdown span').html())
// 		time--;
// 		$('.countdown span').html(time);
// 		console.log(time)
// 		if (time == 0) {
// 			$('.toback').click();
// 			clearInterval(tid)
// 		}
// 	},1000)
})