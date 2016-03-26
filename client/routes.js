angular.module('guc_qa').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
 
  $stateProvider
    .state('questionsList',{
        url:'/questions',
        template: '<questions-list></questions-list>',
        resolve: {
          currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject();
          }
          else {
            return $q.resolve();
          }
        }
        }
       })
    .state('allQuestions',{
        url:'/',
        template: '<all-questions></all-questions>',
        resolve: {
          currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject();
          }
          else {
            return $q.resolve();
          }
        }
        }
       })
    .state('userProfile',{
        url:'/user',
        template: '<user-profile></user-profile>',
        resolve: {
          currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject();
          }
          else {
            return $q.resolve();
          }
        }
        }
       })
    
    
 
  $urlRouterProvider.otherwise("/");
   $urlRouterProvider.when('', '/');
});
