angular.module('gucqa').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('questions', {
      url: '/questions',
      template: '<questions-index></questions-index>'
    });

  $urlRouterProvider.otherwise("/questions");
});

