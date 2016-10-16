module.exports = {
	main: function(bot, message) {
		var config = require('../config.json');
		var mysql = require('mysql');
		var connection = mysql.createConnection({
		  host: config.host,
		  user: config.sqluser,
		  password: config.sqlpassword,
		  database: 'asianbot'
		});
		connection.query('SET NAMES utf8mb4');
		
		const owner = bot.users.get(config.owner);
		
		if(message.author.id == message.server.owner.id || message.author.id == owner.id) {
			connection.query('SELECT DISTINCT prefix FROM servers WHERE id = ' + msg.guild.id, function (error, results, fields) {
				var PREFIX = results[0].prefix;
				var newprefix = message.content.substring(0, 1);
				if(PREFIX == newprefix) {
					msg.reply("this is the same prefix!");
					return;
				}
				
				console.log(newprefix);
				connection.query('UPDATE servers SET prefix = ? WHERE id = ?', [newprefix, message.guild.id], function (error, results, fields) {});
				message.reply("Successfully set server prefix to ``" + newprefix + "``!");
			});
		}
	}
};