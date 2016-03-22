angular.module('gucqa').directive('questionsIndex', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/questions/index/index.html',
    controllerAs: 'questionsIndex',
    controller: function($scope, $reactive) {
      $reactive(this).attach($scope);

      this.newQuestion = {}

      this.helpers({
        questions: () => {
          return Questions.find({});
        }
      });

      this.addQuestion = () => {
        Questions.insert(this.newQuestion);
        this.newQuestion = {};
      };
    }
  }
});
