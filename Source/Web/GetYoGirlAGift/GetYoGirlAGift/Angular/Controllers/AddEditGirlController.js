$scope.UploadPushpinFile = function () {
	var files = $scope.pushpinFiles;
	if (files.length == 0) {
		ShowMessage("Error uploading pushpin file", "Error: No pushpin files to load.  Browse for a pushpin image file.");
		return;
	}
	//$scope.pushpinFileName = files.length == 1 ? files[0].name : files[0].name + " " + files[1].name + "...";
	$scope.pushpinFilestatus = "Loading...";

	angular.forEach(files, function (value, key) {
		if (value.type.indexOf("image") == -1) {
			$('#pushpinFileField').val('');
			$scope.pushpinFile = undefined;
			$scope.pushpinFilestatus = undefined;
			ShowMessage("Error uploading pushpin file", "Error: File " + value._file.name + " is not of image format.", "Please load an image file.");
			return;
		}
	});

	var uploadUrl = "/api/Data/UploadPushpinFile";

	var servCall = MapMGRService.UploadPushpinFile(files, uploadUrl, $scope.pushpinFileOverwrite);
	servCall.then(function (response) {
		$scope.response = response.data;
		// Clear the file input so the same file can be re-loaded and the change event fires.
		$('#pushpinFileField').val('');
		if ($scope.response.Status == "Error") {
			$scope.pushpinFilestatus = "Load failed";
			GetPushpins();
			ShowMessage();
			return;
		}
		$scope.pushpinFilestatus = "Loaded successfully";
		$scope.pushpinFileLoaded = true;
		GetPushpins();
		ShowMessage();
		$scope.showCancel = false;
	}, function (error) {
		$('#pushpinFileField').val('');
		$scope.pushpinFilestatus = "Loaded failed";
		GetPushpins();
		ShowMessage("Error", 'Error uploading pushpin file: ' + error.data.ExceptionMessage, '');
	})
};



$scope.SavePushpin = function (pushpin) {

	pushpin.PushpinOffsetXPixels = pushpin.tempPushpinOffsetXPixels == "" ? 0 : pushpin.tempPushpinOffsetXPixels;
	pushpin.PushpinOffsetYPixels = pushpin.tempPushpinOffsetYPixels == "" ? 0 : pushpin.tempPushpinOffsetYPixels;
	pushpin.editMode = false;
	$scope.ShowLoading("Saving pushpin ...");
	$scope.processing = true;
	pushpin.UserName = $rootScope.user.UserName;
	var servCall = MapMGRService.SavePushpin(pushpin);
	servCall.then(function (response) {
		$scope.response = response.data;
		GetPushpins(0);
		ShowMessage();
		$scope.processing = false;
	}, function (error) {
		ShowMessage("Error", 'Error saving pushpin: ' + error.data.ExceptionMessage, '');
		$scope.processing = false;
	})
}