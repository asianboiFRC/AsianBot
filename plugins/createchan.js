module.exports = {
	main: function(bot, message) {
		if (message.member.roles.exists('name', 'Bot Commander')) {
			try {
				const channelToCreate = message.content;
				message.guild.createChannel(channelToCreate, 'text');
				message.channel.sendMessage("Alright, I have created the channel #" + channelToCreate + "!");
			}
			catch(err) {
				console.log(err);
				message.channel.sendMessage("ERR: " + err);
			}
		}
	}
};