angular.module("guc_qa",['angular-meteor', 'ui.router','accounts.ui','ui.select']);
angular.module("guc_qa").directive('questionsList',function(){	
	return {
	      restrict: 'E',
	      templateUrl: 'client/questions/questions-list/questions-list.html',
	      controllerAs: 'questionsList',
	      controller: function($scope, $reactive, $location) {
	        $reactive(this).attach($scope);
	 
	        // this.helpers({
	        //   questions: () => {
	        //     return Questions.find({});
	        //   }
	        // });
	        this.newQuestion= []
	        this.addQuestion= () => {
	        	this.newQuestion.owner=Meteor.user()._id
	        	Questions.insert(this.newQuestion);
	        	this.newQuestion= [];
	        }
	        
	        

	      }
	    }
	  }); 

	  angular.module("guc_qa").directive('allQuestions',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/questions/all-questions/all-questions.html',
	      controllerAs: 'allQuestions',
	      controller: function($scope, $reactive) {
	        $reactive(this).attach($scope);
	 
	        
	        this.helpers({
	      		questions: () => {
	      			return Questions.find();
	      		}
	      	})

	        

	      }
	     }
	  }); 

	   angular.module("guc_qa").directive('userProfile',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/users/user-profile.html',
	      controllerAs: 'userProfile',
	      controller: function($scope, $reactive) {
	        $reactive(this).attach($scope);
	 
	        
	        this.helpers({
	      		users: () => {
	      		return Meteor.users.find({"_id": Meteor.userId()});
	      		}
	      	})

	        

	      }
	     }
	  }); 
	   angular.module("guc_qa").directive('allCourses',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/courses/all-courses.html',
	      controllerAs: 'allCourses',
	      controller: function($scope, $reactive) {
	        $reactive(this).attach($scope);
	        
	        
	        this.helpers({
	      		courses: () => {
	      		return Courses.find()
	      		}
	      	})

	        

	      }
	     }
	  }); 
	   angular.module("guc_qa").directive('courseQuestions',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/courses/course-questions.html',
	      controllerAs: 'courseQuestions',
	      controller: function($scope, $state,$stateParams, $reactive,$location) {
	        $reactive(this).attach($scope);
	       this.courseId= $stateParams.courseId;
	       this.helpers({
	       	code: () => {
	       		return Courses.find();
	       	}
	       })

	        this.newCourse=[];
	       

	         this.askQuestion= () => {
	        	this.newCourse.courseId= $stateParams.courseId;
	        	this.newCourse.owner= Meteor.userId();
	        	this.newCourse.date= moment().format('MMMM Do YYYY, h:mm:ss a');
	        	this.newCourse.courseCode = Courses.findOne({_id: $stateParams.courseId}).code
	        	Questions.insert(this.newCourse);
	        	this.newCourse= [];
	        }
	        
	        
	       
	        

	      }
	     }
	  });
	   angular.module("guc_qa").directive('recentQuestions',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/questions/recent-questions/recent-questions.html',
	      controllerAs: 'recentQuestions',
	      controller: function($scope, $state,$stateParams, $reactive,$location) {
	        $reactive(this).attach($scope);
	       this.courseId= $stateParams.courseId;
	       this.helpers({
	       	questions: () => {
	       		return Questions.find({}, {sort: {date: -1}});
	       	}
	       })

	       
	      

	      }
	     }
	  });

	   angular.module("guc_qa").directive('allAnswers',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/answers/all-answers.html',
	      controllerAs: 'allAnswers',
	      controller: function($scope, $state,$stateParams, $reactive,$location) {
	        $reactive(this).attach($scope);
	        this.newAnswer=[];
	         this.answerQuestion= () => {
	         	this.newAnswer.owner= Meteor.userId();
	         	this.newAnswer.questionId= $stateParams.questionId;
	         	this.newAnswer.date= moment().format('MMMM Do YYYY, h:mm:ss a');
	         	Answers.insert(this.newAnswer);
	         	this.newAnswer= [];


	         }

	       
	      

	      }
	     }
	  });
	   angular.module("guc_qa").directive('alAnswers',function(){	
	     return {
	      restrict: 'E',
	      templateUrl: 'client/answers/al-answers.html',
	      controllerAs: 'alAnswers',
	      controller: function($scope, $state,$stateParams, $reactive,$location) {
	        $reactive(this).attach($scope);
	        this.helpers({
	        	answers: () => {
	        		return Answers.find({ questionId: $stateParams.questionId })
	        	}
	        })
	       
	      

	      }
	     }
	  });