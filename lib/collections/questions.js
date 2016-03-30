Questions = new Mongo.Collection("questions");

Questions.allow({
  insert: function (userId, question) {
    return userId && question.owner === userId;
  },
  update: function (userId, question, fields, modifier) {
    return userId && question.owner === userId;
  }
});
