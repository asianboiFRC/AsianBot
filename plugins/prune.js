module.exports = {
	main: function(bot, message) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander"))){
			var num = message.content.split(" ").splice(1).join(" ");
			if(!isNaN(num)){
				bot.getChannelLogs(message.channel, num, (err, messages) => {
					bot.deleteMessages(messages)
					if (err) {
						bot.sendMessage(message, "I don't have permission to delete message.")
					} else {
						bot.sendMessage(message, "Deleted " + num + " messages under request of <@" + message.author.id + ">");
					}
				})
			}
		}
	}
};