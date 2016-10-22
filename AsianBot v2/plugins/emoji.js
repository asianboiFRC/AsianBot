module.exports = {
	main: function(bot, message) {
		var emoji = require('emoji-random');
		message.channel.sendMessage(emoji.random());
	}
};