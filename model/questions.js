Questions= new Mongo.Collection('questions');
Questions.allow({
	insert: function(userId,question){
		return userId && question.owner ===userId;
	},
	update: function(userId,question,modifier){
		return userId && question.owner=== userId;
	},
	remove: function(userId,question){
		return userId &&question.owner=== userId;
	}
})