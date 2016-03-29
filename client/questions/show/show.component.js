angular.module('gucqa').directive('questionShow', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/questions/show/show.html',
    controllerAs: 'questionShow',
    controller: function ($scope, $state, $stateParams, $reactive) {
      $reactive(this).attach($scope);

      this.helpers({
        question: () => {
          return Questions.findOne({ _id: $stateParams.questionId });
        },
        answers: () => {
          return Answers.find({ questionId: $stateParams.questionId}, { sort: { createdAt: -1 } });
        }
      });

      this.save = () => {
        Questions.update({_id: $stateParams.questionId}, {
          $set: {
            content: this.question.content
          }
        }, (error) => {
          if (error) {
            console.log('An error occurred!');
          } else {
            console.log('Done!');
            $state.go('questions');
          }
        });
      };

      this.newAnswer = {};

      this.addAnswer = () => {
        this.newAnswer.createdAt = new Date();
        this.newAnswer.questionId = $stateParams.questionId;

        Answers.insert(this.newAnswer);
        this.newAnswer = {};
      };
    }
  }
});
