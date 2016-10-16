module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;
		
		if (message.member.roles.exists('name', 'Bot Commander') || isCommander.indexOf(message.author.id) > -1){
			var num = message.content;
			if(!isNaN(num)){
				message.channel.fetchMessages({limit: num})
					.then(messages => message.channel.bulkDelete(messages))
					.catch(message.channel.bulkDelete);
				message.channel.sendMessage("Deleted " + num + " messages under request of <@" + message.author.id + ">");
			}
			else {
				message.channel.sendMessage("Please specify a number");
			}
		}
	}
}