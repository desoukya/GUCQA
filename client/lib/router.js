angular.module('gucqa').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('questions', {
      url: '/questions',
      template: '<questions-index></questions-index>'
    })
    .state('questionShow', {
      url: '/questions/:questionId',
      template: '<question-show></question-show>'
    })
    .state('courses', {
      url: '/courses',
      template: '<courses-index></courses-index>'
    });

  $urlRouterProvider.otherwise("/questions");
});

