angular.module('gucqa').directive('questionShow', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/questions/show/show.html',
    controllerAs: 'questionShow',
    controller: function ($scope, $stateParams) {
      var questionId = $stateParams.questionId;
      this.question = Questions.findOne(questionId);
    }
  }
});
