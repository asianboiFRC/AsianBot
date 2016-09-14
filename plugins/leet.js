module.exports = {
	main: function(bot, message) {
		const leet = require('leetspeak');
		message.channel.sendMessage(leet(message.content));
	}
};