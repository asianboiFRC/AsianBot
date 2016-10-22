module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		
		if (message.author.id === "171319044715053057" || isCommander.indexOf(message.author.id) > -1) {
            var sudosay = message.content;
            message.channel.sendMessage(sudosay);
            message.delete();
        }
	}
};