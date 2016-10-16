module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var isCommander = config.admins;		
		if (message.member.roles.exists('name', 'Bot Commander') || isCommander.indexOf(message.author.id) > -1){
			var user = message.mentions.users.array()[0];
			var roleToGive = message.content.split(" ").splice(1).join(" ");
			roleToGive = roleToGive.trim();
			let role = message.guild.roles.find("name", roleToGive);
			if (!role) {
				message.channel.sendMessage("Role does not exist.");
				return;
			}
			var member = message.guild.members.find('id', user.id);
			member.addRole(role).catch(console.error);
			message.channel.sendMessage("Successfully added role " + roleToGive + " to " + user.username + ".");
		}
	}
};