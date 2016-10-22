module.exports = {
	main: function(bot, message) {
		const predict = require('eightball');
		message.reply(predict());
	}
};