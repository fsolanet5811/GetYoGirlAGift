


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

        $scope.processing = false;

        $rootScope.GetGirls = function (inspectionID) {
            $scope.gettingGirls = true;
            var servCall = MapMGRService.GetBatchInfos(inspectionID);
            servCall.then(function (response) {
                inspectionInfo = response.data;
                angular.forEach($rootScope.inspections.data, function (value, key) {
                    if (value.ID == inspectionInfo.ID) {
                        value.BatchInfos = inspectionInfo.BatchInfos;
                        value.AuditBatchInfos = inspectionInfo.AuditBatchInfos;
                    }
                });
                $scope.gettingBatches = false;
            }, function (error) {
                $scope.gettingBatches = false;
                ShowMessage("Error", 'Error getting batches from the system: ' + error.data.ExceptionMessage, '');
            })
        }



        if ($rootScope.ExpandedInspections == undefined) {
            $rootScope.ExpandedInspections = [];  // Holds the IDs of the inspections that are to be shown in expanded mode
        }

        $scope.ExpandedInspectionID = 0;  // holds the id of the inspection being expanded or colapsed

        if ($rootScope.home.showDowns == undefined) $rootScope.home.showDowns = true;

        function GetGirls() {
            $scope.ShowLoading("Loading girls...")
            var servCall = $http.get($rootScope.baseUrl + '/api/girls/foruser/' + $rootScope.user.Id);
            servCall.then(function (response) {
                $rootScope.user.Girls = response.data;
                $scope.processing = false;
            }, function (error) {
                $scope.gettingJobs = false;
                ShowMessage("Error", 'Error getting Girls: ' + error.data.ExceptionMessage, '');
            })
        }

        
        // Inspection level actions
        $scope.EditGirl = function (r) {
            $scope.selectedInspection = angular.copy(r);
            //$scope.selectedInspection = r;
            $scope.goToAddEditGirl();
        }

        $rootScope.AddGirl = function () {
            $scope.selectedGirl = undefined;
            $scope.goToAddEditGirl();
        }

        $scope.goToAddEditGirl = function () {
            $state.go('addEditGirl', { inspection: $scope.selectedGirl });
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
             
        }

        $scope.ShowLoading = function (msg) {
            $scope.msg = msg;
            $scope.processing = true;
        }

        $rootScope.Logout = function () {
            $rootScope.user.UserName = "";
            $rootScope.user.FullName = "";
            $state.go('login');
        }
    }
]);


