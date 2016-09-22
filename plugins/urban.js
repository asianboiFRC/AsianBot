module.exports = {
	main: function(bot, message) {
		var urban = require('urban'),
		definition = urban(message.content);
		try {
			definition.first(function(def) {
				if(def != undefined) {
					message.channel.sendMessage("**" + def.word + "** | Urban Dictionary" + 
												"\n**Definition**: " + def.definition + 
												"\n**Example**: " + def.example + 
												"\n" + def.thumbs_up + " :thumbsup: | " + def.thumbs_down + " :thumbsdown: | Author: " + def.author);
				}
				else {
					message.channel.sendMessage("Could not find word.");
				}
			});
		}
		catch(err) {
			message.channel.sendMessage("An error occurred.");
		}
	}
};