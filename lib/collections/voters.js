Voters = new Mongo.Collection('voters');

Voters.allow({
  insert: function (userId, vote) {
    return userId && vote.owner === userId;
  },
  update: function (userId, vote, fields, modifier) {
    return userId && vote.owner === userId;
  }
});

if (Meteor.isServer) {
  Meteor.publish('voters', function() {
    return Voters.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('voters');
}
