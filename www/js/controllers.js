angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('forgotPassword', function($scope,$ionicActionSheet,$location, $timeout ) {

		// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'EMAIL' },
			{ text: 'MOBILE' }
			],
			destructiveText: 'CANCEL',
			titleText: 'How would you like to reset your password?',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$location.url('/app/forgetPasswordEmail');
				}
				if(index == 1)
				{
					$location.url('/app/forgetPasswordMobile');
				}
				return true;
			},

      destructiveButtonClicked: function() {
        return true;
      }
			});
	};
	$scope.show();
	$scope.showForgotPasswordOption = function()
	{
		$scope.show();
	}
})


.controller('forgetPasswordMobile', function($scope,$http,$ionicActionSheet,$location, $timeout ) {
    $scope.resetPassword = {};
    $scope.resetPassword.updateType = "mobile";
		// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'RESEND' },
			{ text: 'OK' }
			],
			titleText: '<b>Reset code Sent!</b><br>check your mobile for a sms from ------- with a link to reset code',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$scope.generateResetCode();
				}
				if(index == 1)
				{
					$location.url('/app/forgetPasswordResetCode');
				}
				return true;
			}
			});
	};
	$scope.generateResetCode = function()
	{
	console.log($scope.resetPassword);
    $http({
    method: 'POST',
    url: "http://139.59.11.3:3500/userLogin/login",
    data : $scope.resetPassword
    }).then(function successCallback(response) {
      if(response.status == 200)
      {
        $scope.show();
      }
      else
      {
        // show error message
        //$location.url('/app/forgetPasswordError');
        //omit this function and unhide error message url
        $scope.show();
      }
    }, function errorCallback(response) {
    // handle error
    });
	}
})
.controller('forgetPasswordEmail', function($http,$scope,$ionicActionSheet,$location, $timeout ) {
    $scope.resetPassword = {};
    $scope.resetPassword.updateType = "emailId";
	// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'RESEND' },
			{ text: 'OK' }
			],
			titleText: '<b>Reset code Sent!</b><br>check your mobile for a sms from ------- with a link to reset code',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$scope.generateResetCode();
				}
				if(index == 1)
				{
					$location.url('/app/forgetPasswordResetCode');
				}
				return true;
			}
			});
	};
	$scope.generateResetCode = function()
	{
	  console.log($scope.resetPassword);
    $http({
    method: 'POST',
    url: "http://139.59.11.3:3500/userLogin/login",
    data : $scope.resetPassword
    }).then(function successCallback(response) {
      if(response.status == 200)
      {
        $scope.show();
      }
      else
      {
        // show error message for unauthentic user
        //$location.url('/app/forgetPasswordError');
        //omit this function and unhide error message url
        $scope.show();
      }
    }, function errorCallback(response) {
    // handle error
    });
	}
})
.controller('forgetPasswordResetCode', function($http,$scope,$timeout,$interval,$location) {
  $scope.resetPassword = {};
	$scope.resetCodeTime = 60000;
	$timeout(function() {
		$location.url('/app/forgotPassword');
	}, $scope.resetCodeTime);
	
	$scope.coundownTimer = 0;
	$scope.coundownTimerLeft = 0;
	 var stop;
        $scope.startInterval = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stop) ) return;

          stop = $interval(function() {
            $scope.coundownTimerLeft = ($scope.resetCodeTime/1000) - $scope.coundownTimer ;
		$scope.coundownTimer++;
          }, 1000);
        };

        $scope.stopInterval = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopInterval();
        });	
	$scope.startInterval();

	$scope.enterResetCode = function()
	{
	console.log($scope.resetPassword);
    $http({
    method: 'POST',
    url: "http://139.59.11.3:3500/userLogin/login",
    data : $scope.resetPassword
    }).then(function successCallback(response) {
      if(response.status == 200)
      {
        // added data make login and redirect to login or dashboard
      }
      else
      {
        $location.url('/app/forgetPasswordError');
      }
    }, function errorCallback(response) {
    // handle error
    });
	}
})
.controller('forgetPasswordError', function($scope,$timeout,$interval,$location) {

})





/*
// N.B please install nodemailer using npm install nodemailer
var nodemailer 	= require('nodemailer'),
	config 		= {
	          'email_from'		    : 'company/organisation/person/sender name',
	          'email_user'		    : 'xyz@gmail.com',
	          'email_password'	  : 'XXXXXXXXXXXXX',
	          'email_host' 		    : 'smtp.gmail.com',
	          'email_timeout'		  : 500000,
	          'email_port'		    : 465,
	          'email_ssl'			    : false,
	          'secure_connection' : false,

};
var to_mail = "abcd@gmail.com"
var subject = "Forgot password";
var body = "message body";



    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://'+config.email_user+':'+config.email_password+'@'+config.email_host);
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from        : config.email_from+'<'+config.email_user+'>', // sender address
        to          : to_mail, // list of receivers
        subject     : subject, // Subject line
        text        : '', // plaintext body
        html        : body // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        else
        {
            //console.log(info);
        }
    });


*/
