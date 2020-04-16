

getYoGirlAGiftApp.controller('SignupController', ['$scope', '$rootScope', '$state', '$http', '$filter', '$location',
function ($scope, $rootScope, $state, $http, $filter, $location) {

	$scope.ShowLoading = function (msg) {
		$scope.msg = msg;
		$scope.processing = true;
	}

	$rootScope.baseUrl = 'http://localhost:61414';

	$scope.confirmPassword = '';

	var user = {};
	$rootScope.user = user;
	
	var home = {};
	$rootScope.home = home;
	$scope.processing = false;
	
	$scope.signup = function () {
		
		if(!$rootScope.user.Email || $rootScope.user.Email == ''){
			$rootScope.user.message = 'An email is required.';
			return;
		}

		if(!$rootScope.user.Username || $rootScope.user.Username == ''){
			$rootScope.user.message = 'A username is required.';
			return;
		}
		
		if(!$rootScope.user.Password || $rootScope.user.Password == ''){
			$rootScope.user.message = 'A password is required.';
			return;
		}

		if($rootScope.user.Password.localeCompare($scope.confirmPassword) != 0) {
			$rootScope.user.message = 'Passwords do not match.';
			return;
		}
		
		$scope.processing = true;
		$scope.ShowLoading("Signing up...");
		$http({
			method: 'POST',
			headers: {
				'Authorization': 'bearer ' + $rootScope.token
			  },
			url: $rootScope.baseUrl + '/api/users/signup',
			data: {
				Username: $rootScope.user.Username,
				Password: $rootScope.user.Password,
				Email: $rootScope.user.Email 
			}
		}).then(function (response) {
			if (response.data.Success) {
				// Successful login
				//$rootScope.user.RoleName = response.data.RoleName;
				//$rootScope.user.IsAdmin = $rootScope.user.RoleName.indexOf('Admin') > -1;
				$rootScope.user.Message = null;
				$scope.processing = false;
				$state.go('login');
			}
			else {
				$rootScope.user.Message = response.data.Message;
				$scope.processing = false;
			}
		}, function (error) {
			//$rootScope.user = {};
			$rootScope.user.Message = error.data.ExceptionMessage;
			$scope.processing = false;
		});
	}

	$scope.GoToLoginPage = function() {
		$state.go('login');
	}
	
	function getToken(){
		$scope.ShowLoading("Loading...");
		
		$http({
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded' 
			},
			url: $rootScope.baseUrl + '/token',
			data:'username=ApiAccess&password=ApiAccessPassword&grant_type=password'
		})
		.then(function (response) {
			$rootScope.token = response.data.access_token;
			$scope.processing = false;
		}, function (error) {
			//$rootScope.user = {};
			$rootScope.user.Message = error.data.ExceptionMessage;
			$state.go('login');
			$scope.processing = false;
		});
	}
}]);




////////////////////////////////////////////////////////////////
/// Directives
////////////////////////////////////////////////////////////////
//#region Directives

getYoGirlAGiftApp.directive('focusmMe', function ($timeout, $parse) {
return {
	link: function (scope, element, attrs) {
		var model = $parse(attrs.focusMe);
		scope.$watch(model, function (value) {
			if (value === true) {
				$timeout(function () {
					scope.$apply(model.assign(scope, false));
					element[0].focus();
				}, 30);
			}
		});
	}
};
});

//#endregion Directives
