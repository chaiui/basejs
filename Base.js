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
