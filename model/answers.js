Answers= new Mongo.Collection('answers');
Answers.allow({
  insert: function (userId, answer) {
    return Meteor.userId() && answer.owner === Meteor.userId();
  },
  update: function (userId, answer, fields, modifier) {
    return Meteor.userId() && answer.owner === Meteor.userId();
  },
  remove: function (userId, answer) {
    return Meteor.userId() && answer.owner === Meteor.userId();
  }
});