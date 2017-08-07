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
