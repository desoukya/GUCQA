angular.module('gucqa').directive('courseShow', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/courses/show/show.html',
    controllerAs: 'courseShow',
    controller: function ($scope, $state, $stateParams, $reactive) {
      $reactive(this).attach($scope);

      this.newQuestion = {}

      this.helpers({
        course: () => {
          return Courses.findOne({ _id: $stateParams.courseId });
        },
        questions: () => {
          return Questions.find({courseId: this.course._id}, { sort: { createdAt: -1 } });
        }
      });

      this.numberOfAnswers = (questionsId) => {
        return Answers.find({questionId: questionsId}).count();
      }

      this.addQuestion = () => {
        this.newQuestion.createdAt = new Date();
        this.newQuestion.votes = 0;
        this.newQuestion.courseId = $stateParams.courseId;
        this.newQuestion.owner = Meteor.user()._id;

        Questions.insert(this.newQuestion);
        this.newQuestion = {};
      }
    }
  }
});

