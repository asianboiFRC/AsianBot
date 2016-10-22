module.exports = {
	main: function(bot, msg) {
		var mutee = msg.mentions.users.array()[0];
		if (msg.member.roles.exists('name', 'Bot Commander')) {
			try {
				var muted = msg.guild.members.find('id', mutee.id);
				let role = msg.guild.roles.find('name', 'muted');
				muted.removeRole(role).catch(console.error);
				msg.reply(mutee + ' has been unmuted.');
			} catch (e) {
				console.log(e);
				msg.channel.sendMessage('muted Role does not exist');
			}
		} else {
			msg.reply('You do not have permission to do this action');
		}
	}
};