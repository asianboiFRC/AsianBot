const fse = require('fs-extra');

module.exports = {
	main: function(bot, message) {
		message.author.sendMessage(fse.readFileSync('./help.txt');
	}
};