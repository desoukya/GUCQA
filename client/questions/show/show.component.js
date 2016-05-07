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
        // owner: () => {
        //   return Meteor.users.findOne({ _id: this.question.owner}).emails[0].address;
        // }
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
      this.getAnswer = () => {
        return Answers.findOne({questionId:$stateParams.questionId},{ sort: { createdAt: -1 } } );
      }
      this.AnswervoteUp = () => {
        if (vote = Votes.findOne({voteanswerId: this.getAnswer()._id, owner: Meteor.user()._id})) {
          if (vote.direction == 'up') {
            console.log("Already voted!!");
            return;
          } else {
            Votes.update({_id: vote._id}, { $set: { direction: 'up' }});
          }
        } else {
          Votes.insert({voteanswerId: this.getAnswer()._id, owner: Meteor.user()._id, direction: 'up'});
        }

        Answers.update({_id: this.getAnswer()._id}, {
          $set: {
            votes: this.getAnswer().votes + 1
          }
        }, (error) => {
          if (error) {
            console.log('An error occurred!');
          }
        });
      };
      this.AnswervoteDown = () => {
        if (vote = Votes.findOne({voteanswerId: this.getAnswer()._id, owner: Meteor.user()._id})) {
          if (vote.direction == 'down') {
            console.log("Already voted!");
            return;
          } else {
            Votes.update({_id: vote._id}, { $set: { direction: 'down' }});
          }
        } else {
          Votes.insert({voteanswerId: this.getAnswer()._id, owner: Meteor.user()._id, direction: 'down'});
        }

        Answers.update({_id: this.getAnswer()._id}, {
          $set: {
            votes: this.getAnswer().votes - 1
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

      this.questionOwner = (ownerId) => {
        return Meteor.users.findOne({ _id: ownerId}).emails[0].address;
      };
    }
  }
});
