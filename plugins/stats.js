module.exports = {
	main: function(bot, message) {
		message.channel.sendMessage("Stats for AsianBOT: \n" + bot.users.size + " Users\n" + bot.channels.size + " Channels\n" + bot.guilds.size + " Servers");
	}
};