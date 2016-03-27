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
    .state('allCourses',{
        url:'/courses',
        template: '<all-courses></all-courses>',
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
    .state('courseQuestions',{
        url:'/courses/:courseId',
        template: '<course-questions></course-questions>',
        resolve:{
         courseId: ['$stateParams', function($stateParams){
          return $stateParams.courseId;
         }]
       },
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
    .state('recentQuestions',{
        url:'/recentQuestions',
        template: '<recent-questions></recent-questions>',
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
    .state('allAnswers',{
        url:'/allAnswers/:questionId',
        template: '<all-answers></all-answers>',
        resolve:{
         questionId: ['$stateParams', function($stateParams){
          return $stateParams.questionId;
            }]
          },
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
    
    .state('alAnswers',{
        url:'/alAnswers/:questionId',
        template: '<al-answers></al-answers>',
        resolve:{
         questionId: ['$stateParams', function($stateParams){
          return $stateParams.questionId;
            }]
          },
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
  
});
