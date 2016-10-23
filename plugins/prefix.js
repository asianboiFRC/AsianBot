module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var servers = require('../servers.json');		
		const owner = bot.users.get(config.owner);
		
		function findLocation(id) {
			for (i = 0; i < servers.length; i++) {
				if(servers[i].serverid == id) {
					return i;
				}
			}
			return null;
		}
		
		if(message.author.id == message.guild.owner.id || message.author.id == config.owner) {
			var id = message.guild.id;
			var i = findLocation(id);
			var PREFIX = servers[i].prefix;
			var newprefix = message.content.substring(0, 1);
			if(PREFIX == newprefix) {
				message.reply("this is the same prefix!");
				return;
			}
			servers[i].prefix = newprefix;
			console.log(newprefix);
			message.reply("Successfully set server prefix to ``" + servers[i].prefix + "``!");
		}
	}
};