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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	var myapp = angular.module('myapp', ["ui.router", "services"])


	myapp.controller("ResidentCtrl", ['$scope', '$http', '$stateParams', 'getAndStoreCharacter' , function($scope, $http, $stateParams, getAndStoreCharacter) {
	  var url = ("http://swapi.co/api/people/" + $stateParams.id + "/?format=json")
	    getAndStoreCharacter.getCharacter(url);
	}]);



	myapp.controller("PlanetCtrl", [ '$scope', '$http', 'getAndStoreCharacter', function($scope, $http, getAndStoreCharacter) {

	  $scope.planets = [];
	  $http.get("http://swapi.co/api/planets/?format=json").then(resp => {
	    $scope.planets = resp.data.results.map(planet => {
	      planet.residents = planet.residents.map(resident => {
	        var resident = { url: resident };
	        resident.id = resident.url.match(/\d+/)[0];
	        var charNames = getAndStoreCharacter.characterNames
	          if(charNames){
	            charNames.forEach(function(input){
	              if (resident.url === input.charUrl){
	                resident.name = input.charName;
	                console.log(resident)
	              }
	            })
	          }
	        return resident;
	      })
	      return planet;
	    })

	  }).catch(error => console.error(error.status));
	}]);


	myapp.config(['stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	  $urlRouterProvider.otherwise("/planets")

	    $stateProvider
	    .state('planets', {
	      url: "/planets",
	      templateUrl: "planets.html",
	      controller: "PlanetCtrl"
	    })
	  .state('resident', {
	    url: "/resident/:id",
	    templateUrl: "resident.html",
	    controller: "ResidentCtrl"
	  })
	}]);






/***/ }
/******/ ]);
