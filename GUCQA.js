Users= new Mongo.Collection('users');
Departments= new Mongo.Collection('departments');
Courses= new Mongo.Collection('courses');
Questions= new Mongo.Collection('questions');
Answers= new Mongo.Collection('answers');
Comments= new Mongo.Collection('comments');
Reports= new Mongo.Collection('reports');
Ratings= new Mongo.Collection('ratings');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
