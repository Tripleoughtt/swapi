var app = angular.module('services', [])


app.service('getAndStoreCharacter', ['$http', function($http){
  var characterNames = []; 
  this.currChar = {};
  this.getCharacter = function(url){
    console.log('Getting character!!!')
    return $http.get(url).then((data) => {
      characterNames.push({charUrl : data.data.url , charName : data.data.name})
      this.currChar = data.data
      console.log(characterNames)
    })
  };
  this.characterNames = characterNames;
}]);

app.service('planetFactory', ['$http','getAndStoreCharacter', function($http, getAndStoreCharacter){
  this.planetData = {}
  this.getPlanets = $http.get("http://swapi.co/api/planets/?format=json").then((data) => {
    this.planetData = data.data.results
    console.log(this.planetData.results)
  })
}]);
