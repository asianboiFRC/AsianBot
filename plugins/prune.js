module.exports = {
	main: function(bot, message) {
		if (message.member.roles.exists('name', 'Bot Commander')){
			var num = message.content.split(" ").splice(1).join(" ");
			if(!isNaN(num)){
				message.channel.fetchMessages({limit: num})
					.then(messages => message.channel.bulkDelete(messages));
					if (err) {
						message.channel.sendMessage("I don't have permission to delete message.")
					} else {
						message.channel.sendMessage("Deleted " + num + " messages under request of <@" + message.author.id + ">");
					}
			}
		}
	}
}