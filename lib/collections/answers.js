Answers = new Mongo.Collection('answers');

Answers.allow({
  insert: function (userId, answer) {
    return userId && answer.owner === userId;
  },
  update: function (userId, answer, fields, modifier) {

    console.log(fields);
    if (fields == 'votesA') {
      return userId;
    } else {
      return userId && answer.owner === userId;
  }
  }
    
});

if (Meteor.isServer) {
  Meteor.publish('answers', function() {
    return Answers.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('answers');
}
