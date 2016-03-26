angular.module("guc_qa",['angular-meteor', 'ui.router','accounts.ui']);
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