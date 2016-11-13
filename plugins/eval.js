module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		if (message.author.id === "171319044715053057" || isCommander.indexOf(message.author.id) > -1) {
			var evalcode = message.content;
			try {
				var evaled = eval(evalcode);
				if (typeof evaled !== 'string') {
					evaled = require('util').inspect(evaled);
				}
				message.channel.sendMessage("Code: ```js\n" + evalcode + "```\nOutput: ```diff\n" + clean(evaled) + "```");
			}
			catch (err) {
				message.channel.sendMessage("Error: " + clean(err));
			}
		}
		else {
			message.channel.sendMessage("You do not have permission to use this command");
		}
		
		function clean(text) {
			if (typeof(text) === "string") {
				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		}
	}
}
