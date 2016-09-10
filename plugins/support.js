module.exports = {
	main: function(bot, message) {
		const ASIANBOI = bot.users.get("171319044715053057");
		var supportmsg = message.content;
		ASIANBOI.sendMessage(message.author.username + " needs your help!" + 
												"\nServer: " + message.guild.name +
												"\nChannel: #" + message.channel.name + 
												"\nMessage: " + supportmsg);
	}
};