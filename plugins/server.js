module.exports = {
	main: function(bot, message) {
		message.channel.sendMessage(
            "```╠═►Server: " + message.guild.name +
            "\n╠═►Owner: " + message.guild.owner.user.username +
            "\n╠═►Region: " + message.guild.region +
            "\n╠═►Server ID: " + message.guild.id +
            "\n╠═►Members: " + message.guild.members.size +
            "\n╠═►Channels: " + message.guild.channels.size +
            "\n╠═►Roles: " + message.guild.roles.map(r => r.name).join(", ") +
            "\n╠═►Icon: " + message.guild.iconURL + "```");
	}
};