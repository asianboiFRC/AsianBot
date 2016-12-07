module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.owner;
		
		if(message.author.id == isCommander) {
			var game = message.content;
			bot.user.setGame(game);
			message.reply("Successfully set game to " + game);
		}
	}
};