module.exports = {
	main: function(bot, message) {
		var start = new Date(message.timestamp).getTime();
		message.channel.sendMessage("Pong!")
			.then(message => message.edit("Hello, pong! You're on server " + message.channel.guild.name + ".\nTook " + (message.timestamp.getTime() - start) + " ms to respond."))
			.catch(message.edit);
	}
};