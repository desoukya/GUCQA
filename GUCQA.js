
Departments= new Mongo.Collection('departments');
Courses= new Mongo.Collection('courses');
Questions= new Mongo.Collection('questions');
Answers= new Mongo.Collection('answers');
Comments= new Mongo.Collection('comments');
Reports= new Mongo.Collection('reports');
Ratings= new Mongo.Collection('ratings');



Router.route('/register');
Router.route('/allQuestions');
Router.route('/answers');
Router.route('/allAnswers');
Router.route('/login')

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
  Router.route('/')
  Template.register.events({
    'submit form': function(event){
      event.preventDefault;
      console.log("Form Submitted");
      var registeredEmail= event.target.registerEmail.value;
      var registeredPassword= event.target.registerPassword.value;
      Accounts.createUser({
        email: registeredEmail,
        password: registeredPassword  

      });
    }

  });

  Template.login.events({
    'submit form': function(event){
      event.preventDefault();
      var loginEmail= event.target.loginEmail.value;
      var loginPassword= event.target.loginPassword.value;
      Meteor.loginWithPassword(loginEmail,loginPassword);

    }

  });

  Template.dashboard.events({
    'click .logout': function(event){
      event.preventDefault;
      Meteor.logout();
    }

  });
  Template.questions.events({
    'submit form': function(event){
      event.preventDefault;
      var question= event.target.title.value;
      Questions.insert({
        title: question

      });
    }

  });
 Template.allQuestions.helpers({
   questionAll: function(){
    return Questions.find();
  }

 });
 Template.answers.events({
  'submit form': function(event){
    event.preventDefault;
    var answer= event.target.answer.value;
    Answers.insert({
      title: answer
    });
  }

 });
 Template.allAnswers.helpers({
  allAnswers: function(){
    return Answers.find();
  }
 })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
