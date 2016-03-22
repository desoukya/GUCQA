angular.module('gucqa').directive('questionsIndex', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/questions/index/index.html',
    controllerAs: 'questionsIndex',
    controller: function($scope, $reactive) {
      $reactive(this).attach($scope);

      this.questions = [
        {
          'content': 'Can we please just for an evening not listen to dubstep.'
        },
        {
          'content': 'Get it on!'
        },
        {
          'content': 'Leisure suit required. And only fiercest manners.'
        }
      ];
    }
  }
});
