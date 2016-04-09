Courses = new Mongo.Collection("courses");

if (Meteor.isServer) {
  Meteor.publish('courses', function() {
    return Courses.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('courses');
}
