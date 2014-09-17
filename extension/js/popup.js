//
// Author Cloud@txthinking.com
//
function unseenC($scope){
    $scope.us = JSON.parse(localStorage.unseen);
    $scope.linkto = function(url){
        chrome.tabs.create({url: url});
    }
}

