module.exports = {
	main: function(bot, message) {
		if (message.mentions.users.array()[0] == null) {
			var member = message.guild.members.get(message.author.id);
			var roles = member.roles.map(r => " " + r.name);
            message.channel.sendMessage("```xml\nName: " + message.author.username +
				"\nNickname: " + member.nickname + 
                "\nDiscriminator: " + message.author.discriminator +
                "\nID: " + message.author.id +
				"\nRoles: " + roles + 
                "\nStatus: " + message.author.presence.status +
				"\nCreated At: " + message.author.createdAt.toDateString() +
                "\n" + message.author.avatarURL + "```");
        } else {
            var user = message.mentions.users.array()[0];
			var member = message.guild.members.get(user.id);
			var roles = member.roles.map(r => " " + r.name);
            message.channel.sendMessage("```xml\nName: " + user.username +
				"\nNickname: " + member.nickname + 
                "\nDiscriminator: " + user.discriminator +
                "\nID: " + user.id +
				"\nRoles: " + roles + 
                "\nStatus: " + user.presence.status +
				"\nCreated At: " + user.createdAt.toDateString() +
                "\n" + user.avatarURL + "```");
        }
	}
};