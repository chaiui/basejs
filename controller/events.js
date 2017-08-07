Base.events = function(element) {
	var self = {};

	// swipe left and right
	var swipe = function(eve, callback) {
		var startX;
		var ev = {};
		ev.dist = 0;
		element.addEventListener("touchstart", function(e) {
			startX = e.touches[0].clientX;
		}, false);

		ev.on = function(type, callback) {
			if (type === "end") {
				element.addEventListener("touchend", function() {
					callback();
				}, false);
			}
		};

		element.addEventListener("touchmove", function(e) {
			var touch = e.touches[0];
			if (eve === "right") {
				var change = touch.clientX - startX;
				ev.dist = -(screen.width - change);
			} else if (eve === "left") {
				var change = startX - touch.clientX;
				ev.dist = screen.width - change;
			}
			callback(ev);
		}, false);
	};

	// build-in events call
	self.on = function(ev, callback) {
		if (ev === "swipeleft") {
			swipe("left", callback);
		} else if (ev === "swiperight") {
			swipe("right", callback);
		} else {
			element.addEventListener(ev, callback, false);
		}
		return self;
	};

	return self;
};


// var ev = Base.events(Base.select("body").elements[0]);
// ev.on("mouseover", function() {
// 	console.log("Mouseover");
// }).on("click", function() {
// 	console.log("Clicked");
// });

//
// ev.on("swipeleft", function(e) {
// 	Base.select(".ov").elements[0].style.left = e.dist + "px";
// 	console.log(e.dist);
//
// 	e.on("end", function() {
// 		// console.log("end");
// 	});
// });
