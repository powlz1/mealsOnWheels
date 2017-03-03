var mealsApp = angular.module('mealsApp', []);

/////////////////////////////////////////////////////////////////////////////////////////////////

mealsApp.controller('MealsController', ['$scope', function($scope) {
    $scope.spice = 'very';

    $scope.chiliSpicy = function() {
        $scope.spice = 'chili';
    };

    $scope.jalapenoSpicy = function() {
        $scope.spice = 'jalapeño';
    };
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////

mealsApp.module('mealsApp', ['mealsApp.filters', 'mealsApp.services', 'mealsApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index',
        controller: MealsController
      }).
      when('/about', {
        templateUrl: 'about',
        controller: MealsController
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);