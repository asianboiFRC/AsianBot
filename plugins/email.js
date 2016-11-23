var nodemailer = require('nodemailer');
var config = require('../config.json');
var username = config.euser;
var pass = config.epass;
var transporter = nodemailer.createTransport('smtps://' + username + '%40gmail.com:' + pass + '@smtp.gmail.com');

module.exports = {
	main: function(bot, msg) {
		let text = msg.content;
		let args = text.split(" ");
		let email = args[0];
		console.log(email);
		let message = text.split(";");
		let content = message[1];
		console.log(content);
		content = content + "<br /><br /><i>This is an email from the Matrix Discord Bot. To visit our server, go to https://discord.gg/scfs8Bx</i>";
		
		var mailOptions = {
			from: '"Matrix Discord Bot" <' + username + '@gmail.com>',
			to: email,
			subject: 'An Email from the Matrix Discord Bot',
			text: content,
			html: content
		};
		
		if (message.author.id === "171319044715053057") {
			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					msg.reply('there was an error sending the message.\n' + error);
					return console.log(error);
				}
				else {
					msg.channel.sendMessage('Message sent: ' + info.response);
					console.log('Message sent: ' + info.response);
				}
			});
		}
		else {
			message.reply("only the bot owner can use this command!");
		}
	}
};