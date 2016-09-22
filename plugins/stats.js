module.exports = {
	main: function(bot, message) {
		message.channel.sendMessage("```------Stats for AsianBOT------" 
								+ "\n> Created by: ASIANBOI#4122"
								+ "\n> Library   : Discord.js"
								+ "\n> Users     : " + bot.users.size
								+ "\n> Channels  : " + bot.channels.size
								+ "\n> Servers   : " + bot.guilds.size + "```");
	}
};