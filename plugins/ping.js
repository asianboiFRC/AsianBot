module.exports = {
	main: function(bot, message) {
		var start = new Date(message.createdAt).getTime();

		message.channel.sendMessage("Pong!")
			.then(message => message.edit("Hello, pong! You're on the " + message.channel.guild.name + " server.\nTook " + (message.createdAt.getTime() - start) + " ms to respond."))
			.catch(console.error);
	}
};
