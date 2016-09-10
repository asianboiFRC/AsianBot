module.exports = {
	main: function(bot, message) {
		if (message.member.roles.exists('name', 'Bot Commander') || isCommander.indexOf(message.author.id) > -1){
			var user = message.mentions.users.array()[0];
			var roleToGive = message.content.split(" ").splice(1).join(" ");
			var role = message.guild.roles.find("name", roleToGive);
			if (!role) {
				message.channel.sendMessage("Role does not exist.");
				return;
			}
			var member = message.guild.members.find('id', user.id);
			member.addRole(roleToGive);
			message.channel.sendMessage("Successfully added role " + roleToGive + " to " + user.username + ".");
		}
	}
};