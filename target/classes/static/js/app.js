var swedApp =  angular.module('UserForms', [
  'controllers',
  'ngRoute'
])
.run(function($rootScope) {
    $rootScope.url = "http://localhost:8080";
});
swedApp.config(['$routeProvider',
  function($routeProvider, $rootScope) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeController'
      }).
      when('/newRegistration', {
              templateUrl: 'partials/newRegistration.html',
              controller: 'newRegistrationController'
            }).
      when('/ContactUs', {
              templateUrl: 'partials/ContactUs.html',
              controller: 'ContactUsController'
            }).
      when('/confirmation', {
              templateUrl: 'partials/confirmation.html',
              controller: 'confirmationController'
            }).
      when('/newUser', {
               templateUrl: 'partials/newUser.html',
               controller: 'newUserController'
            }).
      when('/overview', {
               templateUrl: 'partials/overview.html',
               controller: 'overviewController'
            }).
    when('/refreshOverview', {
                   templateUrl: 'partials/overview.html',
                                  controller: 'overviewController'
                }).
      when('/registrationConfirm', {
               templateUrl: 'partials/registrationConfirm.html',
               controller: 'registrationConfirmController'
            }).
      otherwise({
        redirectTo: '/'
      });
  }]);