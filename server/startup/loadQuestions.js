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
	Courses.insert({code: "CSEN702", name: "Introduction to ComputerProgramming"});
	Courses.insert({code: "CSEN401", name: "Computer Programming Lab"});
	Courses.insert({code: "CSEN402", name: "Computer Organization and System Programming"});
	Courses.insert({code: "CSEN403", name: "Concepts of Programming languages "});
	Courses.insert({code: "CSEN601", name: "Computer System Architecture "});
	Courses.insert({code: "CSEN602", name: "Operating Systems"});
	Courses.insert({code: "CSEN603", name: "Software Engineering "});
	Courses.insert({code: "CSEN604", name: "Data Bases II"});

})
