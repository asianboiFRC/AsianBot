module.exports = {
	main: function(bot, message) {
		bot.sendMessage(message,
            "╠═►Server: " + message.server.name +
            "\n╠═►Owner: " + message.server.owner.name +
            "\n╠═►Created: " + message.server.createdAt +
            "\n╠═►Region: " + message.server.region +
            "\n╠═►Server ID: " + message.server.id +
            "\n╠═►Members: " + message.server.members.length +
            "\n╠═►Channels: " + message.server.channels.length +
            "\n╠═►Roles: " + message.server.roles.map(r => r.name).join(", ") +
            "\n╠═►Icon: " + message.server.iconURL);
	}
};