module.exports = {
	main: function(bot, message) {
		var say = message.content.split(" ").splice(1).join(" ");
        message.reply(say);
	}
};