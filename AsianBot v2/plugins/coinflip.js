module.exports = {
	main: function(bot, message) {
		let coin = Math.random() > 0.5 ? 'Heads' : 'Tails'
		message.channel.sendMessage("The coin landed on " + `${coin}!`);
	}
};