module.exports = {
	main: function(bot, message) {
		if (message.member.roles.exists('name', 'Bot Commander')){
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