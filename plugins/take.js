module.exports = {
	main: function(bot, message) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1){
			var user = message.mentions[0];
			var roleToTake = message.content.split(" ").splice(2).join(" ");
			var role = message.server.roles.get("name", roleToTake);
			if (!role) {
				bot.sendMessage(message, "Role does not exist.");
				return;
			}
			bot.removeMemberFromRole(user.id, role);
			bot.sendMessage(message, "Successfully removed role " + roleToTake + " from " + user.username + ".");
		}
	}
};