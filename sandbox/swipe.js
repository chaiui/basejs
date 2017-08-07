Base.events = function(element) {
	var self = {};

	// build-in events call
	self.on = function(ev, callback) {
		element.addEventListener(ev, callback, false);
		return self;
	};

	self.onswipeleft = function(callback) {
		var startX;
		element.addEventListener("touchstart", function(e) {
			startX = e.touches[0].clientX;
			// console.log(startX);
		}, false);
		element.addEventListener("touchmove", function(e) {
			var touch = e.touches[0];
			var change = startX - touch.clientX;
			if (change < 0) {
				return;
			} else if (Base.select(".ov").elements[0].offsetLeft <= 0) {
				Base.select(".ov").elements[0].style.left = 0;
				return;
			}
			// if (Base.select(".ov").width() !== screen.width)
			Base.select(".ov").elements[0].style.left = (screen.width - change) + "px";
			console.log(Base.select(".ov").elements[0].offsetLeft);
		}, false);
	};

	return self;
};


var ev = Base.events(Base.select("body").elements[0]);
// ev.on("mouseover", function() {
// 	console.log("Mouseover");
// }).on("click", function() {
// 	console.log("Clicked");
// });


ev.onswipeleft(function() {

});
