/*AsianBot v2.6
 *October 11, 2016
 *Created by Michael Cao (ASIANBOI)*/
'use strict';

const Discord = require('discord.js');
var config = require('./config.json');
var news = require('./news.json');
const fse = require('fs-extra');
const PREFIX = config.prefix;
const passes = config.passes;
const version = news.version;
const whatsnew = news.whatsnew;
const fs = require('fs');

const queue = {};
const yt = require('ytdl-core');

var search = require('youtube-search');
var opts = {
	maxResults: 1,
	key: config.ytkey
};

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'asianbot',
  password: 'discordbot!2017',
  database: 'asianbot'
});
connection.query('SET NAMES utf8mb4');

const guildsToAnnounce = ["209467012684972034", "214850991089123328", "215965218449260544", "221663485073817602", "185858769895424001"];

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

bot.login(config.token);

const replyTextToMentions = "Hi! I'm AsianBOT. Use " + PREFIX + "help to see a list of my commands.";
const logChannel = bot.channels.get("214876995375464448");
const msgChannel = bot.channels.get("221038566308839426");
const owner = bot.users.get(config.owner);

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

	const owner = bot.users.get(config.owner);
	owner.sendMessage(bot.user.username + " Online and Ready! On " + bot.guilds.size + " Servers!");
	
	bot.guilds.forEach(guild => {
		var args = {
			ID: guild.id,
			Name: guild.name,
			Owner: guild.ownerID,
			Prefix: '~',
			AnnouncementChannel: guild.defaultChannel.id
		};
		
		connection.query('INSERT IGNORE `servers` SET ?', args);
	});
});

bot.on('message', (msg) => {
	const logChannel = bot.channels.get("214876995375464448");
	const msgChannel = bot.channels.get("221038566308839426");

	var n = msg.timestamp.toTimeString();
	var str = n.substring(0, n.indexOf(' '));

	if (msg.channel.type === "dm" || msg.channel.type === "group") {
		var args = {
			ServerID: msg.channel.type,
			ChannelID: msg.author.id,
			User: msg.author.username,
			UserID: msg.author.id,
			Content: msg.content
		};
		
		var query = 'INSERT INTO `messages` SET ?';
		
		connection.query(query, args);
		
		msgChannel.sendMessage("[" + str + "]" + " [PM] " + msg.author.username + " : " + msg.content);
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
		return;
	}

	if (msg.channel.type === "text") {
		if (msg.guild.id != "110373943822540800" && msg.guild.id != "185858769895424001" && msg.channel.id != "221664440750309377") {
			var args = {
				ServerID: msg.guild.id,
				ChannelID: msg.channel.id,
				User: msg.author.username,
				UserID: msg.author.id,
				Content: msg.content
			};
			
			var query = 'INSERT INTO `messages` SET ?';
			
			connection.query(query, args);
			
			msgChannel.sendMessage("[" + str + "] " + msg.guild + " | " + msg.channel.name + " | " + msg.author.username + ": " + msg.cleanContent);
			console.log(gray("[" + str + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.cleanContent));
		}
	}

	if (msg.author.bot) {return;}

<<<<<<< HEAD
>>>>>>> 2d5e1bd... Moved commented code to a txt file
=======
>>>>>>> 770999c... Fixed head
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
});

bot.on('guildMemberAdd', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
		defaultChannel.sendMessage(":wave: " + user.user.username + " joined the server.");
	}
});

bot.on('guildBanAdd', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
		defaultChannel.sendMessage(":hammer: " + user.username + " was banned.");
	}
});

bot.on('guildMemberRemove', (guild, user) => {
	if (guildsToAnnounce.indexOf(guild.id) > -1) {
		var defaultChannel = bot.channels.get(guild.id);
		defaultChannel.sendMessage(user.user.username + " left the server. RIP " + user.user.username + ".");
	}
});

bot.on("Delete", (message) => {
	const logChannel = bot.channels.get("214876995375464448");
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
	if(message1.author.id == bot.user.id) return;
	if(message1.author.bot) return;

	const logChannel = bot.channels.get("214876995375464448");
	try {
		if (message1.guild.id != "110373943822540800") {
			logChannel.sendMessage(message1.author.username + "'s message was edited!\n Old message: " + message1.content);
			console.log(server(message1.author.username + "'s message was edited!\n Old message: " + message1.content));
		}
	} catch (err) {
		console.log(server("ERROR UPDATED MESSAGE"));
	}
});

bot.on("guildDelete", (guild) => {
	const logChannel = bot.channels.get("214876995375464448");
	const owner = bot.users.get(config.owner);
	console.log("I left " + guild.name);
	logChannel.sendMessage("I left " + guild.name);
	owner.sendMessage("I left " + guild.name);
})

bot.on("guildCreate", (guild) => {
	var args = {
		ID: guild.id,
		Owner: guild.ownerID,
		Prefix: '~',
		AnnouncementChannel: guild.defaultChannel
	};
		
	connection.query('INSERT IGNORE asianbot.servers SET ?', args);
	
	console.log(server("Bot added to " + guild.name));
	var defaultChannel = bot.channels.get(guild.id);
	defaultChannel.sendMessage("Hello! I'm AsianBOT. Someone invited me here. To view my commands do " + PREFIX + "help!\nGive me a role with manage roles, manage guild, and administrator.");
	owner.sendMessage("I joined " + guild.name);
});
<<<<<<< HEAD
>>>>>>> 2d5e1bd... Moved commented code to a txt file
=======
>>>>>>> 770999c... Fixed head
