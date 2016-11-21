module.exports = {
	main: function(bot, message) {
		var emoji = require('emoji-random');
		bot.sendMessage(message, emoji.random());
	}
};