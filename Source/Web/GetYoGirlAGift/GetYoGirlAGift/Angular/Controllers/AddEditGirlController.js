getYoGirlAGiftApp.controller('AddEditGirlController', [
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

			if ($stateParams.selectedGirl != undefined && $stateParams.selectedGirl != {} ) {
				$scope.selectedGirl = $stateParams.selectedGirl;
			}
			
			$scope.imageFiles = [];
			$scope.processing = false;
			$scope.AddInterest = function() {
				$scope.selectedGirl.Interests.push({Id: 0,
				Value: $scope.newInterest})

				$scope.newInterest = '';
			}

			$scope.previewFile = function() {
				const file = $scope.imageFiles[0];
				const reader = new FileReader();
			  
				reader.addEventListener("load", function () {
					$scope.$apply(function() {
						// Strip out the first part. It ends with a base64,
					var result = reader.result.substring(reader.result.indexOf('base64,') + 7);

					$scope.selectedGirl.Images[0].Image = result;
					})				  
				}, false);
			  
				if (file) {
				  reader.readAsDataURL(file);
				  var res = reader.result;
				}
			  }

			$scope.RemoveInterest = function(interest) {
				var index = 0;
				for(var i = 0; i < $scope.selectedGirl.Interests.length; i++) {
					if($scope.selectedGirl.Interests[i] == interest) {
						index = i;
						break;
					}
				}
				$scope.selectedGirl.Interests.splice(index, 1);
			}

			$scope.SaveGirl = function() {
				if($scope.selectedGirl.Id == 0) {
					// This girl is new. Add her.
					AddGirl($scope.selectedGirl);
				}
				else {
					UpdateGirl($scope.selectedGirl);
				}
			}

			function AddGirl(girl) {
				$scope.msg = 'Saving...'
				$scope.processing = true;
				girl.UserId = $rootScope.user.Id;
				$http({
					method: 'POST',
					headers: {
						'Authorization': 'bearer ' + $rootScope.token,
						'Content-Type': 'application/json'
					  },
					url: $rootScope.baseUrl + '/api/girls',
					data: girl
				})
				.then(function (response) {
					$scope.processing = false;
					$scope.GoToHomePage(true);
				}, function (error) {
					//$rootScope.user = {};
					$scope.processing = false;
				});
			}

			function UpdateGirl(girl) {
				$scope.msg = 'Saving...'
				$scope.processing = true;
				$http({
					method: 'Put',
					params: {
						'id': girl.Id
					},
					headers: {
						'Authorization': 'bearer ' + $rootScope.token,
						'Content-Type': 'application/json'
					  },
					url: $rootScope.baseUrl + '/api/girls',
					data: girl
				})
				.then(function (response) {
					$scope.processing = false;
					$scope.GoToHomePage(true);
				}, function (error) {
					//$rootScope.user = {};
					$scope.processing = false;
				});
			}

			$scope.GoToHomePage = function(wasGirlChanged) {
            if (wasGirlChanged) {
              // Get the new girls from the database if they changed.
              $rootScope.GetGirls();
            }
            $state.go('home');
			}

		}])





		getYoGirlAGiftApp.directive('imageFileModel', ['$parse', function ($parse) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var model = $parse(attrs.imageFileModel);
					var isMultiple = attrs.multiple;
					var modelSetter = model.assign;
		
					element.bind('change', function () {
						//var values = [];
						//angular.forEach(element[0].files, function (item) {
						//    var value = {
						//        // File Name 
						//        name: item.name,
						//        //File Size 
						//        size: item.size,
						//        //File URL to view 
						//        url: URL.createObjectURL(item),
						//        type: item.type,
						//        // File Input Value 
						//        _file: item
						//    };
						//    values.push(value);
						//});
		
						//scope.$apply(function () {
						//    if (isMultiple) {
						//        modelSetter(scope, values);
						//    } else {
						//        modelSetter(scope, values[0]);
						//    }
						//});
		
						scope.$apply(function () {
							if (isMultiple) {
								modelSetter(scope, element[0].files);
							} else {
								modelSetter(scope, element[0].files[0]);
							}
						});
						scope.$apply(function () {
							// scope.imageFilestatus = undefined;
							scope.imageFileName = undefined;
							scope.imageFileName = scope.imageFiles.length == 1 ? scope.imageFiles[0].name : scope.imageFiles[0].name + ", " + scope.imageFiles[1].name + "...";
							scope.previewFile();
						});
					
		
						//scope.UploadPushpinFile();
					});
				}
			};
		}]);


	// $scope.UploadPushpinFile = function () {
	// 	var files = $scope.pushpinFiles;
	// 	if (files.length == 0) {
	// 		ShowMessage("Error uploading pushpin file", "Error: No pushpin files to load.  Browse for a pushpin image file.");
	// 		return;
	// 	}
	// 	//$scope.pushpinFileName = files.length == 1 ? files[0].name : files[0].name + " " + files[1].name + "...";
	// 	$scope.pushpinFilestatus = "Loading...";

	// 	angular.forEach(files, function (value, key) {
	// 		if (value.type.indexOf("image") == -1) {
	// 			$('#pushpinFileField').val('');
	// 			$scope.pushpinFile = undefined;
	// 			$scope.pushpinFilestatus = undefined;
	// 			ShowMessage("Error uploading pushpin file", "Error: File " + value._file.name + " is not of image format.", "Please load an image file.");
	// 			return;
	// 		}
	// 	});

	// 	var uploadUrl = "/api/Data/UploadPushpinFile";

	// 	var servCall = MapMGRService.UploadPushpinFile(files, uploadUrl, $scope.pushpinFileOverwrite);
	// 	servCall.then(function (response) {
	// 		$scope.response = response.data;
	// 		// Clear the file input so the same file can be re-loaded and the change event fires.
	// 		$('#pushpinFileField').val('');
	// 		if ($scope.response.Status == "Error") {
	// 			$scope.pushpinFilestatus = "Load failed";
	// 			GetPushpins();
	// 			ShowMessage();
	// 			return;
	// 		}
	// 		$scope.pushpinFilestatus = "Loaded successfully";
	// 		$scope.pushpinFileLoaded = true;
	// 		GetPushpins();
	// 		ShowMessage();
	// 		$scope.showCancel = false;
	// 	}, function (error) {
	// 		$('#pushpinFileField').val('');
	// 		$scope.pushpinFilestatus = "Loaded failed";
	// 		GetPushpins();
	// 		ShowMessage("Error", 'Error uploading pushpin file: ' + error.data.ExceptionMessage, '');
	// 	})
	// };



	// $scope.SavePushpin = function (pushpin) {

	// 	pushpin.PushpinOffsetXPixels = pushpin.tempPushpinOffsetXPixels == "" ? 0 : pushpin.tempPushpinOffsetXPixels;
	// 	pushpin.PushpinOffsetYPixels = pushpin.tempPushpinOffsetYPixels == "" ? 0 : pushpin.tempPushpinOffsetYPixels;
	// 	pushpin.editMode = false;
	// 	$scope.ShowLoading("Saving pushpin ...");
	// 	$scope.processing = true;
	// 	pushpin.UserName = $rootScope.user.UserName;
	// 	var servCall = MapMGRService.SavePushpin(pushpin);
	// 	servCall.then(function (response) {
	// 		$scope.response = response.data;
	// 		GetPushpins(0);
	// 		ShowMessage();
	// 		$scope.processing = false;
	// 	}, function (error) {
	// 		ShowMessage("Error", 'Error saving pushpin: ' + error.data.ExceptionMessage, '');
	// 		$scope.processing = false;
	// 	})
