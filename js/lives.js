var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.count = 0;
	$scope.lives = 3;
});