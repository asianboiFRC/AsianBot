module.exports = {
	main: function(bot, message) {
		const predict = require('eightball');
		bot.sendMessage(message, predict());
	}
};