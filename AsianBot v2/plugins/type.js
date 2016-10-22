module.exports = {
	main: function(bot, message) {
		var channel = bot.channels.find('id', message.guild.id);
		channel.startTyping();
	}
};