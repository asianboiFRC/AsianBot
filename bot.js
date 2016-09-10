/*AsianBot v2.0
 *September 8, 2016
 *Created by Michael Cao (ASIANBOI)*/

'use strict';

const Discord = require('discord.js');
const fse = require('fs-extra');
const PREFIX = "|";
const version = "2.0"
const whatsnew = "Rewrite for Discord.js v9!"
const fs = require('fs')

const isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793"];
const guildsToAnnounce = ["209467012684972034", "214850991089123328", "215965218449260544", "221663485073817602"];

var chalk = require('chalk');
var server = chalk.bold.red;
var chan = chalk.bold.green;
var message = chalk.yellow;
var usr = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;

let bot = new Discord.Client({
  disableEveryone: true
});

fs.readFile('token.txt', 'utf8', (err, token) => {
    if (err) {
        return console.log(err);
    }
    bot.login(token);
});

const replyTextToMentions = "Hi! I'm AsianBOT. Use " + PREFIX + "help to see a list of my commands.";
const logChannel = bot.channels.get("214876995375464448");
const msgChannel = bot.channels.get("221038566308839426");
const ASIANBOI = bot.users.get("171319044715053057");

let plugins = new Map();

function loadPlugins() {
	console.log(__dirname + '/plugins');
	let files = fse.readdirSync(__dirname + '/plugins', 'utf8');
	for (let plugin of files) {
		if (plugin.endsWith('.js')) {
			plugins.set(plugin.slice(0, -3), require(__dirname + '/plugins/' + plugin));
			console.log(plugin.slice(0, -3) + ': ' + plugins.has(plugin.slice(0, -3)));
		} else {
			console.log(plugin);
		}
	}
    console.log('Plugins loaded.');
}

bot.on('ready', () => {
	const logChannel = bot.channels.get("214876995375464448");
	
	console.log('AsianBot is ready! Loading plugins...');
	loadPlugins();
	
    var currentTime = new Date()
    var n = currentTime.toTimeString();
	var str = n.substring(0, n.indexOf(' '));
	
    console.log("Bot Online and Ready! On " + bot.guilds.size + " Servers!");
	logChannel.sendMessage(":stopwatch: ``" + str + "`` :mega: AsianBOT is online and ready! :white_check_mark:");
	bot.user.setStatus("online", '~help | ' + bot.guilds.size + ' Servers');
});

bot.on('message', (msg) => {
	const logChannel = bot.channels.get("214876995375464448");
	const msgChannel = bot.channels.get("221038566308839426");
	
	var n = msg.timestamp.toTimeString();
	var str = n.substring(0, n.indexOf(' '));
		
	if(msg.channel.type === "dm" || msg.channel.type === "group") {
		msgChannel.sendMessage("[" + str + "]" + " [PM] " + msg.author.name + " : " + msg.content);
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
		return;
	}
	
	if(msg.channel.type === "text") {
		if (msg.guild.id != "110373943822540800" && msg.guild.id != "185858769895424001" && msg.channel.id != "221664440750309377") {
			msgChannel.sendMessage("[" + str + "] " + msg.guild + " | " + msg.channel.name + " | " + msg.author.username + ": " + msg.content);
			console.log(gray("[" + str + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.content));
		}
		
		if (msg.author.bot) return;
		
		if (msg.content.startsWith(PREFIX)) {
			let content = msg.content.split(PREFIX)[1];
			let cmd = content.substring(0, content.indexOf(' ')),
				args = content.substring(content.indexOf(' ') + 1, content.length);
			if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
				logChannel.sendMessage(msg.author.username + " executed " + cmd + " " + args + " in " + msg.guild.name);
				console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
				msg.content = args;
				plugins.get(cmd).main(bot, msg);
			} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
				logChannel.sendMessage(msg.author.username + " executed " + cmd + " in " + msg.guild.name);
				console.log(cmand(msg.author.username + " executed: " + content));
				plugins.get(content).main(bot, msg);
			} else {
				console.log('BROKEN:' + content);
			}
		}
	}
});

bot.on('guildMemberAdd', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
        defaultChannel.sendMessage("👋 " + user.user.username + " joined the server.");
    }
});

bot.on('guildBanAdd', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
        defaultChannel.sendMessage("🔨 " + user.user.username + " was banned.");
    }
});

bot.on('guildMemberRemove', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
        defaultChannel.sendMessage(user.user.username + " left the server. RIP " + user.user.username + ".");
    }
});

bot.on("messageDelete", (message) => {
	const logChannel = bot.channels.get("214876995375464448");
	const msgChannel = bot.channels.get("221038566308839426");
	const ASIANBOI = bot.users.get("171319044715053057");
	try {
		if (message.guild.id != "110373943822540800") {
			console.log(server(msg.author.username + "'s message was deleted!\n Old message: " + msg.content));
			logChannel.sendMessage(msg.author.username + "'s message was deleted!\n Old message: " + msg.content);
		}
	} catch (err) {
		console.log(server("ERR: MESSAGE NOT ARCHIVED"));
		logChannel.sendMessage("ERR: MESSAGE NOT ARCHIVED");
	}
});

bot.on("messageUpdate", (message1, message2) => {
	const logChannel = bot.channels.get("214876995375464448");
	const msgChannel = bot.channels.get("221038566308839426");
	const ASIANBOI = bot.users.get("171319044715053057");
	try {
		if (message1.guild.id != "110373943822540800") {
			logChannel.sendMessage(message1.author.username + "'s message was edited!\n Old message: " + message1.content);
			console.log(server(message1.author.username + "'s message was edited!\n Old message: " + message1.content));
		}
	}
	catch(err) {
		console.log(server("ERROR UPDATED MESSAGE"));
	}
});

bot.on("guildDelete", (guild) => {
	const logChannel = bot.channels.get("214876995375464448");
	const msgChannel = bot.channels.get("221038566308839426");
	const ASIANBOI = bot.users.get("171319044715053057");
    console.log("I left " + guild.name);
	logChannel.sendMessage("I left " + guild.name);
	ASIANBOI.sendMessage("I left " + guild.name);
})

bot.on("guildCreate", (guild) => {
    console.log(server("Bot added to " + guild.name));
	logChannel.sendMessage("Bot added to " + guild.name);
	var defaultChannel = bot.channels.get(guild.id);
    defaultChannel.sendMessage("Hello! I'm AsianBOT. Someone invited me here. To view my commands do " + PREFIX + "help!\nGive me a role with manage roles, manage guild, and administrator.");
	ASIANBOI.sendMessage("I joined " + guild.name);
});