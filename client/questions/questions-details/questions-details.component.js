angular.module('guc_qa').directive('questionsDetails',function(){	
	return {
	      restrict: 'E',
	      templateUrl: 'client/questions/questions-details/quesions-details.html',
	      controllerAs: 'questionsDetails',
	      controller: function($scope, $stateParams) {
	      	this.questionId= $stateParams.questionId;
	      }
	  }
	        
	  });