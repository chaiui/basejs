Base.animate = function(el) {
	var self = {};
	var dur = 0.25;
	var delay = 0;

	function setWithVendor(element, property, value) {
		console.log(element);
	  element.style["webkit" + property] = value;
	  element.style["moz" + property] = value;
	  element.style["ms" + property] = value;
	  element.style["o" + property] = value;
	}

	self.duration = function(d) {
		dur = d;
		return self;
	};
	self.delay = function(d) {
		delay = d;
		return self;
	};

	self.set = function(type, obj) {
		var _keys = Object.keys(obj);
		var trans = "";
		var style = {};
		for (var i = 0; i < _keys.length; i++) {
			style[_keys[i]] = obj[_keys[i]];
			trans += _keys[i] + " " + dur + "s " + delay + "s " + type + ",";
		}
		trans = trans.substring(0, trans.length - 1);
		console.log(trans);
		Base.addStyle(el, {
			"transition": trans,
			"-webkit-transition": trans,
			"-ms-transition": trans,
			"-moz-transition": trans,
			"-o-transition": trans
		});
		Base.addStyle(el, style);
	}

	self.ease = function(type, obj) {
		if (type === "undefined") {
			self.set("ease", obj);
		} else {
			self.set("ease-" + type, obj);
		}
	};

	self.linear = function(obj) {
		self.set("linear", obj);
	};

	self.step = function(type, obj) {
		self.set("step-" + type, obj);
	};

	self.cubicBezier = function(ani_obj, obj) {
		self.set("cubic-bezier(" + ani_obj.startX + "," + ani_obj.startY + "," + ani_obj.endX + "," + ani_obj.endY + ")", obj);
	};

	return self;
}

// var div = Base.select("div").elements[0];
// div.addEventListener("click", function () {
// 	Base.animate(div)
// 			.duration(5)
// 			.ease("in-out", {
// 				"background-color": "red" });
// });
