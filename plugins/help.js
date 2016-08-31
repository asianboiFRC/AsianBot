module.exports = {
	main: function(bot, message) {
		bot.sendMessage(message,
            "AsianBOT (IN DEVELOPMENT)\nCommand list: git, ping, invite, help, stats, say, server, user, talk, support." +
            "\nFOR BOT COMMANDERS: warn, ban, verify, mute, unmute, kick, prune, give, take" +
            "\nFOR ADMINS: eval, type, stoptype, sudosay, sudoinvite" +
            "\nMusic Commands: summon, play, np, disconnect, queue, clear, clean, restart, search, resume, skip, pause, setname, setnick, shuffle" +
            "\nType ~license for the software license." +
            "\nCheck out my server at https://discord.gg/scfs8Bx");
	}
};