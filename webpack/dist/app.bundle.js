/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _clients = __webpack_require__(1);

	var _funcao = __webpack_require__(2);

	console.log(_clients.clients);
	console.log((0, _funcao.soma)(10, 20));
	/*
	require(['./clients'],function(clients){
	    console.log(colecao);
	});

	var colecao = require('./clients');
	var funcao = require('./funcao');

	console.log(colecao);
	console.log(funcao(10,20));
	    */

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var clients = [{ name: 'Cliente 1' }, { name: 'Cliente 2' }, { name: 'Cliente 3' }, { name: 'Cliente 4' }];

	exports.clients = clients;

	/*define('clients',[],function(){
	    var clients = [
	        {name: 'Cliente 1'},
	        {name: 'Cliente 2'},
	        {name: 'Cliente 3'},
	        {name: 'Cliente 4'},
	    ];
	    return clients;
	});
	*/

	//module.exports = clients;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.soma = soma;
	function soma(num1, num2) {
	    return num1 + num2;
	};

	/*
	function soma(num1,num2){
	    return num1+num2;
	}

	module.exports = soma;
	*/

/***/ }
/******/ ]);