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

      this.questionOwner = (ownerId) => {
        return Meteor.users.findOne({ _id: ownerId}).emails[0].address;
      };

      this.upvote = () => {
        if (vote = Votes.findOne({votableId: $stateParams.questionId, votableType: 'question', owner: Meteor.user()._id})) {
          if (vote.direction == 'up') {
            console.log("Already voted!!");
            return;
          } else {
            Votes.update({_id: vote._id}, { $set: { direction: 'up' }});
          }
        } else {
          Votes.insert({votableId: $stateParams.questionId, votableType: 'question', owner: Meteor.user()._id, direction: 'up'});
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

      this.downvote = () => {
        if (vote = Votes.findOne({votableId: $stateParams.questionId, votableType: 'question', owner: Meteor.user()._id})) {
          if (vote.direction == 'down') {
            console.log("Already voted!");
            return;
          } else {
            Votes.update({_id: vote._id}, { $set: { direction: 'down' }});
          }
        } else {
          Votes.insert({votableId: $stateParams.questionId, votableType: 'question', owner: Meteor.user()._id, direction: 'down'});
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
    }
  }
});
