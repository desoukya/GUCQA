Meteor.startup(function(){
	if(Questions.find().count===0){
		var questions= [
		{
			'name': 'This is the first question',
			'description': 'whats your name'
		}
		];
		for(var i=0;i<questions.length;i++){
			Questions.insert(questions[i]);	
		}
	}
})