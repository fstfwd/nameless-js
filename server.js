(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("body-parser"));
	else if(typeof define === 'function' && define.amd)
		define(["body-parser"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("body-parser")) : factory(root["body-parser"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createService = undefined;

	var _bodyParser = __webpack_require__(1);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _commander = __webpack_require__(2);

	var _commander2 = _interopRequireDefault(_commander);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createService = function createService(name, services) {
	    return { name: name, services: services };
	};

	var promiseResolve = function promiseResolve(res) {
	    return function (data) {
	        return res.json(data);
	    };
	};
	var promiseReject = function promiseReject(next) {
	    return function (e) {
	        return next(e);
	    };
	};

	var handleRoute = function handleRoute(commander) {
	    return function (req, res, next) {
	        commander.exec(req.params.service, req.body.action, req.body.payload).then(promiseResolve(res), promiseReject(next)).catch(promiseReject(next));
	    };
	};

	function nameless(_ref, app) {
	    var _ref$apiPrefix = _ref.apiPrefix,
	        apiPrefix = _ref$apiPrefix === undefined ? '' : _ref$apiPrefix,
	        _ref$services = _ref.services,
	        services = _ref$services === undefined ? [] : _ref$services;

	    var commander = (0, _commander2.default)(services);
	    app.post(apiPrefix + '/:service', _bodyParser2.default.urlencoded({ extended: false }), _bodyParser2.default.json(), handleRoute(commander));

	    global.nameless = {
	        exec: commander.exec
	    };

	    return { commander: commander, apiPrefix: apiPrefix };
	}

	exports.default = nameless;
	exports.createService = createService;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var createActionFunc = function createActionFunc(fn) {
	    return function (payload) {
	        return new Promise(function (resolve, reject) {
	            fn(payload, resolve, reject);
	        });
	    };
	};

	function commander() {
	    var services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


	    var obj = {};

	    services.forEach(function (service) {
	        if (!obj[service.name]) {
	            obj[service.name] = {};
	        }

	        Object.keys(service.services).forEach(function (action) {
	            obj[service.name][action] = createActionFunc(service.services[action]);
	        });
	    });

	    function execute(service, action, payload) {
	        try {
	            return obj[service][action](payload);
	        } catch (e) {
	            return Promise.reject(e);
	        }
	    }

	    return {
	        exec: execute
	    };
	}

	exports.default = commander;

/***/ }
/******/ ])
});
;