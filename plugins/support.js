module.exports = {
	main: function(bot, message) {
		var supportmsg = message.content.split(" ").splice(1).join(" ");
		bot.sendMessage("171319044715053057", message.author.username + " needs your help!" + 
												"\nServer: " + message.server.name +
												"\nChannel: #" + message.channel.name + 
												"\nMessage: " + supportmsg);
	}
};