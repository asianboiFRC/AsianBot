module.exports = {
	main: function(bot, message) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (message.member.roles.exists('name', 'Bot Commander') || isCommander.indexOf(message.author.id) > -1){
			var user = message.mentions.users.array()[0];
			var roleToTake = message.content.split(" ").splice(1).join(" ");
			var role = message.guild.roles.find("name", roleToTake);
			if (!role) {
				message.channel.sendMessage("Role does not exist.");
				return;
			}
			var member = message.guild.members.find('id', user.id);
			member.removeRole(roleToTake);
			message.channel.sendMessage("Successfully removed role " + roleToTake + " from " + user.username + ".");
		}
	}
};