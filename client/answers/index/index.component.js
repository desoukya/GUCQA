angular.module('gucqa').directive('answersIndex', function() {
  return {
    restrict: 'E',
    scope: { question: '=' },
    templateUrl: 'client/answers/index/index.html',
    controllerAs: 'answersIndex',
    controller: function($scope, $reactive) {
      $reactive(this).attach($scope);

      this.helpers({
        answers: () => {
          var id = this.getReactively('questionId');
          return Answers.find({ questionId: id}, { sort: { createdAt: -1 } });
        }
      });

      this.setQuestionId = (questionId) => {
        this.questionId = questionId;
        return;
      };

      this.newAnswer = {};

      this.addAnswer = () => {
        this.newAnswer.createdAt = new Date();
        this.newAnswer.questionId = this.questionId;
        this.newAnswer.owner = Meteor.user()._id;
        this.newAnswer.votes=0;

        Answers.insert(this.newAnswer);

        this.newAnswer = {};
      };

      this.answerOwner = (ownerId) => {
        return Meteor.users.findOne({ _id: ownerId}).emails[0].address;
      };
    }
  }
});


