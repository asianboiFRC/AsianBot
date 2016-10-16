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
		
		var newprefix = message.content.substring(0, 1);
		console.log(newprefix);
		connection.query('UPDATE servers SET prefix = ? WHERE id = ?', [newprefix, message.guild.id], function (error, results, fields) {});
		message.reply("Successfully set server prefix to ``" + newprefix + "``!")
	}
};