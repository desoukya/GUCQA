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
        },
        owner: () => {
          return Meteor.users.findOne({ _id: this.question.owner}).emails[0].address;
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
        this.newAnswer.owner = Meteor.user()._id;

        Answers.insert(this.newAnswer);

        this.newAnswer = {};
      };

      this.upVote = () => {
        if (vote = Voters.findOne({votableId: $stateParams.questionId, owner: Meteor.user()._id})) {
          if (vote.direction == 'up') {
            console.log("Already voted!!");
            return;
          } else {
            Voters.update({_id: vote._id}, { $set: { direction: 'up' }});
          }
        } else {
          Voters.insert({votableId: $stateParams.questionId, owner: Meteor.user()._id, direction: 'up'});
        }

        Questions.update({_id: $stateParams.questionId}, {
          $set: {
            votes: this.question.votes + 1
          }
        }, (error) => {
          if (error) {
            console.log('An error occurred!');
          }
        });
      };

      this.downVote = () => {
        if (vote = Voters.findOne({votableId: $stateParams.questionId, owner: Meteor.user()._id})) {
          if (vote.direction == 'down') {
            console.log("Already voted!");
            return;
          } else {
            Voters.update({_id: vote._id}, { $set: { direction: 'down' }});
          }
        } else {
          Voters.insert({votableId: $stateParams.questionId, owner: Meteor.user()._id, direction: 'down'});
        }

        Questions.update({_id: $stateParams.questionId}, {
          $set: {
            votes: this.question.votes - 1
          }
        }, (error) => {
          if (error) {
            console.log('An error occurred!');
          }
        });
      };

      this.answerOwner = (ownerId) => {
        return Meteor.users.findOne({ _id: ownerId}).emails[0].address;
      };
    }
  }
});
