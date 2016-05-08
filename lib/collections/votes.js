Votes = new Mongo.Collection('votes');

Votes.allow({
  insert: function (userId, vote) {
    return userId && vote.owner === userId;
  },
  update: function (userId, vote, fields, modifier) {
    return userId && vote.owner === userId;
  }
});

if (Meteor.isServer) {
  Meteor.publish('votes', function() {
    return Votes.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('votes');
}
