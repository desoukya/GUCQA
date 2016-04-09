Questions = new Mongo.Collection("questions");

Questions.allow({
  insert: function (userId, question) {
    return userId && question.owner === userId;
  },
  update: function (userId, question, fields, modifier) {
    if (fields == 'votes') {
      return userId;
    } else {
      return userId && question.owner === userId;
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('questions', function() {
    return Questions.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('questions');
}
