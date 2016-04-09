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
          return Questions.find({}, { sort: { createdAt: -1 } });
        },
        courses: () => {
          return Courses.find({}, { sort: { code: 1 } });
        }
      });

      this.numberOfAnswers = (questionsId) => {
        return Answers.find({questionId: questionsId}).count();
      }

      this.addQuestion = () => {
        this.newQuestion.createdAt = new Date();
        this.newQuestion.votes = 0;
        this.newQuestion.owner = Meteor.user()._id;

        Questions.insert(this.newQuestion);

        this.newQuestion = {};
      };
    }
  }
});
