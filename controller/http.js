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
