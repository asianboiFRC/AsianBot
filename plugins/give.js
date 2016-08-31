module.exports = {
	main: function(bot, message) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1){
			var user = message.mentions[0];
			var roleToGive = message.content.split(" ").splice(2).join(" ");
			var role = message.server.roles.get("name", roleToGive);
			if (!role) {
				bot.sendMessage(message, "Role does not exist.");
				return;
			}
			bot.addMemberToRole(user.id, role);
			bot.sendMessage(message, "Successfully added role " + roleToGive + " to " + user.username + ".");
		}
	}
};