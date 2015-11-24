
var myapp = angular.module('myapp', ["ui.router", "services"])


myapp.controller("ResidentCtrl", ['$scope', '$http', '$stateParams', 'getAndStoreCharacter' , function($scope, $http, $stateParams, getAndStoreCharacter) {
  var url = ("http://swapi.co/api/people/" + $stateParams.id + "/?format=json")
    getAndStoreCharacter.getCharacter(url).then(data => {
      $scope.character = getAndStoreCharacter.currChar;
    });
}]);

myapp.run(function(getAndStoreCharacter,$rootScope, planetFactory){
   planetFactory.getPlanets.then(data => {
     console.log(data)
   $rootScope.planets = planetFactory.planetData;
    console.log($rootScope.planets)
    $rootScope.planets = $rootScope.planets.map(planet => {
      console.log('Planet', planet);
      planet.residents = planet.residents.map(resident => {
        console.log(resident)
        var resident = {url : resident};
        console.log(resident.url)
        resident.id = resident.url.match(/\d+/)[0];
        var charNames = getAndStoreCharacter.characterNames; 
          charNames.forEach(input => {
            if(resident.url === input.charUrl){
              resident.name = input.charName;
              console.log(resident);
            }
          })
        console.log(resident)
        return resident;
        })
        return planet;
      })
    })
});

myapp.controller("PlanetCtrl", [ '$rootScope','$scope', '$q', '$http', 'planetFactory', 'getAndStoreCharacter', function($rootScope,$scope, $q, $http, planetFactory, getAndStoreCharacter) {

  $scope.$watchCollection(function(){
    return planetFactory.planetData;
  }, function(newval, oldval){ 
    $scope.planets = $rootScope.planets
    $scope.planets = newval.map(planet => {
      planet.residents = planet.residents.map(resident => {
        var charNames = getAndStoreCharacter.characterNames; 
          charNames.forEach(input => {
            if(resident.url === input.charUrl){
              resident.name = input.charName;
              console.log(resident);
            }
          })
        return resident;
      })
      return planet;
    });
  })
}]);


  myapp.config(function($stateProvider, $urlRouterProvider){

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
  });




