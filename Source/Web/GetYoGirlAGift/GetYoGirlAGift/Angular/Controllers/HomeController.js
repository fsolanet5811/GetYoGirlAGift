


getYoGirlAGiftApp.controller('HomeController', [
    '$scope'
    , '$filter'
    , '$rootScope'
    , '$state'
    , '$stateParams'
    , '$http'
    , function ($scope,
        $filter,
        $rootScope,
        $state,
        $stateParams,
        $http) {

        if ($stateParams.response != undefined && $stateParams.response != {} ) {
            $scope.response = $stateParams.response;
            ShowMessage();
        }

        $rootScope.relationships = [
            {Id: 0, Name: 'Wife'}, 
            {Id: 1, Name: 'Girlfriend'}, 
            {Id: 2, Name: 'Sister'}, 
            {Id: 3, Name: 'Mother'}, 
            {Id: 4, Name: 'Grandmother'}, 
            {Id: 5, Name: 'Daughter'}, 
            {Id: 6, Name: 'Granddaughter'}, 
            {Id: 7, Name: 'Friend'},
            {Id: 8, Name: 'Cousin'}, 
            {Id: 9, Name: 'Aunt'},
            {Id: 10, Name: 'Niece'}, 
            {Id: 11, Name: 'Other'}
        ];

        $rootScope.RelationshipFromNumber = function(num) {
            for(var i = 0; i < $rootScope.relationships.length; i++) {
                if($rootScope.relationships[i].Id == num) {
                    return $rootScope.relationships[i].Name;
                }
            }

            return "Other";
        }

        $scope.processing = false;

        if ($rootScope.home.showDowns == undefined) $rootScope.home.showDowns = true;

        $scope.ShowLoading = function (msg) {
            $scope.msg = msg;
            $scope.processing = true;
        }

        $rootScope.GetGirls = function() {
            $scope.ShowLoading("Loading girls...");
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + $rootScope.token
                },
                url: $rootScope.baseUrl + '/api/girls/foruser/' + $rootScope.user.Id,


            })
            .then(function (response) {
                $rootScope.user.Girls = response.data;
                $scope.processing = false;
            }, function (error) {
                $scope.gettingJobs = false;
                ShowMessage("Error", 'Error getting Girls: ' + error.data.ExceptionMessage, '');
            });
        }

        

        $scope.GoToGiftSearchPage = function () {
            $state.go('search', { selectedGirl: $scope.selectedGirl });
        }

        $scope.CardClicked = function (girl) {
            $scope.selectedGirl = girl;
            $scope.GoToGiftSearchPage();
        }

        // Inspection level actions
        $rootScope.EditGirl = function (r) {
            $scope.selectedGirl = angular.copy(r);
            //$scope.selectedGirl = r;
            $scope.goToAddEditGirl();
        }

        $rootScope.AddGirl = function () {
            $scope.selectedGirl = {
                Id: 0,
                Name: '',
                Interests: [],
                ImportantDates: [],
                Images: [{
                    Image:'',
                    Id: 0
                }],
                Relationship: 0
            };
            $scope.goToAddEditGirl();
        }

        $scope.goToAddEditGirl = function () {
            $state.go('addEditGirl', { selectedGirl: $scope.selectedGirl });
        }

        // Inspection Confirmation Functions
        $scope.DeleteGirlConfirm = function (g) {
            $scope.dialogHeader = "Delete Girl";
            $scope.selectedInspection = g;
            $scope.dialogObject = "girl";
            $scope.dialogAction = "Delete";
            $scope.dialogText = [];
            $scope.dialogText.push("Are you sure you would like to delete");
            $scope.dialogText.push("girl " + g.Name + "?");
        }

     
        // Inspection Action selecting function
        $scope.PerformActionForGirl = function (action, g) {
            if (action == "Delete") $scope.DeleteGirl(g);
        }

        $scope.DeleteGirl = function (g) {
            $scope.ShowLoading("Deleting Girl ...");
            var servCall = $http({
                method: 'DELETE',
                headers: {
                'Authorization': 'bearer ' + $rootScope.token
                },
                url: $rootScope.baseUrl + '/api/girls/' + g.Id,
        })
            servCall.then(function (response) {
                if(response.data.Id == g.Id){
                    GetGirls();
                }
            }, function (error) {
                ShowMessage("Error", 'Error deleting Girl: ' + error.data.ExceptionMessage, '');
                $scope.processing = false;
            })
        }

        $scope.GoToGiftSearchPage = function (g) {
          $state.go('search', { selectedGirl: $scope.selectedGirl });
        }

       

        $rootScope.Logout = function () {
            $rootScope.user.UserName = "";
            $rootScope.user.FullName = "";
            $state.go('login');
        }
    }
]);


