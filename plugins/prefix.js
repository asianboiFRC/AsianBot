module.exports = {
	main: function(bot, message) {
		var newprefix = message.content.trim();
		connection.query('UPDATE servers SET prefix = ? WHERE id = ?', [newprefix, message.guild.id], function (error, results, fields) {});
		message.reply("Successfully set server prefix to ``" + newprefix + "``!")
	}
};