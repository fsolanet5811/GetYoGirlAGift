

getYoGirlAGiftApp.controller('LoginController', ['$scope', '$rootScope', '$state', '$http', '$filter', '$location',
    function ($scope, $rootScope, $state, $http, $filter, $location) {

		$scope.ShowLoading = function (msg) {
            $scope.msg = msg;
            $scope.processing = true;
        }

      $rootScope.baseUrl = 'http://getyogirlagift.azurewebsites.net'//http://localhost:61414';

        var user = {};
        $rootScope.user = user;
        var home = {};
        $rootScope.home = home;
		$scope.processing = false;
        
        $scope.errorMessage = '';

		getToken();

        $scope.login = function () {
			
			if(!$rootScope.user.Username || $rootScope.user.Username == ''){
				$rootScope.errorMessage = 'A username is required.';
				return;
			}
			
			if(!$rootScope.user.Password || $rootScope.user.Password == ''){
				$rootScope.errorMessage = 'A password is required.';
				return;
			}
			
            $scope.processing = true;
            $scope.ShowLoading("Verifying username and password...");
            $http({
				method: 'POST',
				headers: {
					'Authorization': 'bearer ' + $rootScope.token
				  },
                url: $rootScope.baseUrl + '/api/users/login',
                data: $rootScope.user
            }).then(function (response) {
                if (response.data.Success) {
                    // Successful login
                    $rootScope.user = response.data.User;
                    //$rootScope.user.RoleName = response.data.RoleName;
                    //$rootScope.user.IsAdmin = $rootScope.user.RoleName.indexOf('Admin') > -1;
                    $rootScope.user.Message = null;
                    $scope.processing = false;
                    $state.go('home');
                }
                else {
                    $scope.errorMessage = 'Login failed';
                    $scope.processing = false;
                }
            }, function (error) {
                //$rootScope.user = {};
                console.log(error);
                $scope.errorMessage = 'Login failed';
                $scope.processing = false;
            });
        }

        $scope.GoToSignupPage = function() {
            $state.go('signup');
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
                console.log(error);
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
