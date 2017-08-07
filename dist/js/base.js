function __Base__() {}
var Base = new __Base__();

Base.each = function(list, callback) {
	var keys = Object.keys(list);
	for (var i = 0; i < keys.length; i++) {
		callback(keys[i], list[keys[i]]);
	}
};

Base.addStyle = function(element, obj) {
	var keys = Object.keys(obj);
	for (var i = 0; i < keys.length; i++) {
		element.style[keys[i]] = obj[keys[i]];
	}
};

Base.select = function (selector) {
	var self = new Object();
	var eq = 0;
	var isIndexSet = false;
	self.elements = document.querySelectorAll(selector);

	/* select an elemet from the list of elements */
	self.index = function(i) {
		eq = i;
		isIndexSet = true;
		return self;
	};

	/* Set or Get an element inside html */
	self.html = function(val) {
		if (typeof val === "undefined") {
			return self.elements[eq].innerHTML;
		} else {
			if (!isIndexSet) {
				for (var i = 0; i < self.elements.length; i++) {
					self.elements[i].innerHTML = val;
				}
			} else {
				self.elements[eq].innerHTML = val;
			}
		}
		return self;
	};

	/* Set or Get attribute */
	self.attr = function(attribute, value) {
		if (arguments.length > 2) {
			throw "expect only '2' arguments, but '" + arguments.length + "' is given";
			return;
		}else if (typeof attribute === "undefined") {
			throw "required a attrbute name as argument.";
			return;
		} else if (typeof value === "undefined") {
			return self.elements[eq].getAttribute(attribute);
		} else {
			if (!isIndexSet) {
				for (var i = 0; i < self.elements.length; i++) {
					self.elements[i].setAttribute(attribute, value);
				}
			} else {
				self.elements[eq].setAttribute(attribute, value);
			}
		}
		return self;
	};

	/* addClass to an element(s) */
	self.addClass = function(val) {
		if (typeof val === "undefined") {
			throw "expect an argument, but '" + val + "' is given";
			return;
		}
		if (!isIndexSet) {
			for (var i = 0; i < self.elements.length; i++) {
				var classes = self.elements[i].getAttribute("class");
				if (classes === null || classes.length === 0) {
					self.elements[i].setAttribute("class", val);
				} else {
					if (val !== "") {
						self.elements[i].setAttribute("class", classes + " " + val);
					}
				}
			}
		} else {
			var classes = self.elements[eq].getAttribute("class");
			if (classes === null) {
				self.elements[eq].setAttribute("class", val);
			} else {
				if (val !== "") {
					self.elements[eq].setAttribute("class", classes + " " + val);
				}
			}
		}
		return self;
	};

	/* removeClass to an element(s), take an array as argument */
	self.removeClass = function(val) {
		if (typeof val === "undefined") {

		}

		for (var q = 0; q < val.length; q++) {
			if (!isIndexSet) {
				for (var i = 0; i < self.elements.length; i++) {
					var classes = self.elements[i].classList;
					if (classes.length !== 0) {
						var newClasses = "";
						// creating new class
						for (var j = 0; j < classes.length; j++) {
							if (classes[j] !== val[q]) {
								if (j < (classes.length - 2)) {
									newClasses += (classes[j] + " ");
								} else {
									newClasses += classes[j];
								}
							}
						}
						// setting classes
						self.elements[i].setAttribute("class", newClasses);
					}
				}
			} else {
				var classes = self.elements[eq].classList;
				if (classes.length !== 0) {
					var newClasses = "";
					// creating new class
					for (var j = 0; j < classes.length; j++) {
						if (classes[j] !== val[q]) {
							if (j < (classes.length - 2)) {
								newClasses += (classes[j] + " ");
							} else {
								newClasses += classes[j];
							}
						}
					}
					// setting classes
					self.elements[eq].setAttribute("class", newClasses);
				}
			}
		}
		return self;
	};

	self.addStyle = function(obj) {
		if (!isIndexSet) {
			for (var i = 0; i < self.elements.length; i++) {
				Base.addStyle(self.elements[i], obj);
			}
		} else {
			Base.addStyle(self.elements[eq], obj);
		}
		return self;
	};

	self.height = function() {
		return self.elements[eq].offsetHeight;
	};
	self.width = function() {
		return self.elements[eq].offsetWidth;
	};
	self.parent = function() {
		return self.elements[eq].parentNode;
	};
	self.children = function() {
		return self.elements[eq].children;
	};

	// insert after
	self.after = function(newNode) {
			if (typeof newNode !== "string") {
				var strCont = document.createElement("span");
				strCont.appendChild(newNode);
				newNode = strCont.innerHTML;
			}

	    if (isIndexSet) {
				var span = document.createElement("span");
				span.innerHTML = newNode;
				var els = span.childNodes;
				self.elements[eq].parentNode.insertBefore(els, self.elements[eq].nextSibling);
			} else {
				for (var i = 0; i < self.elements.length; i++) {
					var span = document.createElement("span");
					span.innerHTML = newNode;
					var els = span.childNodes;
					for (var _i = 0; _i < els.length; _i++) {
						self.elements[i].parentNode.insertBefore(els[_i], self.elements[i].nextSibling);
					}
				}
			}
			return self;
	};

	self.each = function(callback) {
		Base.each(self.elements, callback);
	};

	return self;
};

// var test = document.createElement("h1");
// test.innerHTML = "Welcome";
// Base.select("div").after(test);


// console.log(Base.select("div").index(0).attr("data-test", "ok"));
// console.log(Base.select("div").index(0).html("NEW CONTENT"));

// Base.select("div").each(function(el) {
// 	console.log(el);
// });

// Base.select("div").removeClass(["name"]);
// Base.select("div").index(0).addClass("name");

// Base.select("div").index(0).addStyle({
// 	backgroundColor: "green"
// });
//
//
// Base.addStyle(Base.select(".name").elements[1], {
// 	fontSize: "3em"
// });

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

Base.http = function(url) {
	var self = {};

	var request = function(method, callback, params) {
		var _self = {};

		if (params === undefined) {
			_params = {};
		} else {
			var keys = Object.keys(params);
			var _params = "";
			for (var i = 0; i < keys.length; i++) {
				_params += keys[i] + "=" + params[keys[i]] + "&";
			}
			_params = _params.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		_self.on = function(ev, _callback) {
			xhr.addEventListener(ev, _callback, false);
		};
		var res = {};
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				res.text = xhr.responseText;
				res.status = xhr.status;
				res.statusText = xhr.statusText;
				callback(xhr);
			}
		};
		xhr.open(method, url);
		xhr.send(_params);
	};

	// get method
	self.get = function(callback, params) {
		request("GET", callback, params);
		return _self;
	};

	// post method
	self.post = function(callback, params) {
		request("POST", callback, params);
		return _self;
	};
	return self;
};

// var http = Base.http("https://chaiui.com");
// http.get(function(res) {
// 	console.log(res);
// }).on("progress", function() {
// 	console.log("OK");
// });

//# sourceMappingURL=base.js.map
