/*Matrix v3
 *October 22, 2016
 *Created by Michael Cao (ASIANBOI)*/
 
const Discord = require('discord.js');
let bot = new Discord.Client({disableEveryone: true});
 
const config = require('./config.json');
const owner = bot.users.get(config.owner);
const sbl = require('./serverblacklist.json');
const ubl = require('./userblacklist.json');

const fse = require('fs-extra');
const DEFAULT_PREFIX = config.prefix;

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: config.host,
  user: config.sqluser,
  password: config.sqlpassword,
  database: 'asianbot'
});
connection.query('SET NAMES utf8mb4');

const guildsToAnnounce = config.announce;
const logChannel = config.logchannel;
const log = config.log;

let plugins = new Map();

function getTime() {
	var currentTime = new Date()
	var n = currentTime.toTimeString();
	var str = n.substring(0, n.indexOf(' '));
	return time;
}

function loadPlugins() {
	let files = fse.readdirSync(__dirname + '/plugins', 'utf8');
	for (let plugin of files) {
		if (plugin.endsWith('.js')) {
			plugins.set(plugin.slice(0, -3), require(__dirname + '/plugins/' + plugin));
		}
	}
	console.log('Plugins loaded.');
}

bot.on('ready', () => {
	console.log('Matrix is ready! Loading plugins...');
	loadPlugins();
	
	console.log("Bot Online and Ready! On " + bot.guilds.size + " Servers!");
	logChannel.sendMessage(":stopwatch: ``" + str + "`` :mega: Matrix is online and ready! :white_check_mark:");
	bot.user.setStatus("online", DEFAULT_PREFIX + 'help | ' + bot.guilds.size + ' Servers');
	
	bot.guilds.forEach(guild => {
		var args = {
			ID: guild.id,
			Name: guild.name,
			Owner: guild.ownerID,
			Prefix: config.default.prefix
		};
		connection.query('INSERT IGNORE `servers` SET ?', args);
	});
	
	
});

bot.on('message', (msg) => {
	var time = getTime();
	
	if (msg.channel.type === "dm") {
		var args = {
			ServerID: msg.channel.type,
			ChannelID: msg.author.id,
			User: msg.author.username,
			UserID: msg.author.id,
			Content: msg.content
		};
		var query = 'INSERT INTO `messages` SET ?';
		connection.query(query, args);
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
	}
	
	if (msg.channel.type === "text") {
		if (log.indexOf(msg.guild.id) > 0) {
			var args = {
				ServerID: msg.guild.id,
				ChannelID: msg.channel.id,
				User: msg.author.username,
				UserID: msg.author.id,
				Content: msg.content
			};
			
			var query = 'INSERT INTO `messages` SET ?';
			connection.query(query, args);
			console.log(gray("[" + time + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.cleanContent));
		}
		
		if (msg.author.bot) {return;}
		
		if (ubl.indexOf(msg.author.id) != -1 && msg.content.startsWith(PREFIX)) {
			if(msg.author.id != config.owner) {
				msg.reply("you are blacklisted from using Matrix!")
				return;
			}
		}
		
		if(msg.content == "<@!" + bot.user.id + "> What's your prefix?" || msg.content == "<@" + bot.user.id + "> What's your prefix?") {
			msg.reply("my prefix is `" + PREFIX + "`!");
		}
		
		connection.query('SELECT DISTINCT prefix FROM servers WHERE id = ' + msg.guild.id, function (error, results, fields) {
			var PREFIX = results[0].prefix;
			const logChannel = config.logchannel;
			if (msg.content.startsWith(PREFIX)) {
				let content = msg.content.split(PREFIX)[1];
				let cmd = content.substring(0, content.indexOf(' ')),
					args = content.substring(content.indexOf(' ') + 1, content.length);
				if (plugins.get(cmd) !== undefined && args !== undefined) {
					console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
					logChannel.sendMessage(msg.author.username + " executed: " + cmd + " " + args);
					msg.content = args;
					plugins.get(cmd).main(bot, msg);
				} else if (plugins.get(content) !== undefined && args == undefined) {
					logChannel.sendMessage(msg.author.username + " executed: " + content);
					console.log(cmand(msg.author.username + " executed: " + content));
					plugins.get(content).main(bot, msg);
				} else {
					console.log('BROKEN:' + content);
				}
			}
		}
	}
});

bot.on("messageUpdate", (msg1, msg2) => {
	if(msg1.author.id == bot.user.id) return;
	if(msg1.author.bot) return;

	try {
		if (log.indexOf(msg1.guild.id) > 0) {
			console.log(server(msg1.author.username + "'s message was edited!\n Old message: " + msg1.content));
		}
	} catch (err) {
		console.log(server("ERROR UPDATED MESSAGE"));
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

bot.on("guildDelete", (guild) => {
	const owner = bot.users.get(config.owner);
	console.log("I left " + guild.name);
	owner.sendMessage("I left " + guild.name);
})

bot.on("guildCreate", (guild) => {
	if (sbl.indexOf(guild.id) != -1) {
		guild.defaultChannel.sendMessage("This server is blacklisted!");
		guild.leave();
		return;
	}
	
	var args = {
		ID: guild.id,
		Owner: guild.ownerID,
		Prefix: '~',
		AnnouncementChannel: guild.defaultChannel
	};
	var PREFIX = args.Prefix;
		
	connection.query('INSERT IGNORE asianbot.servers SET ?', args);
	
	console.log(server("Bot added to " + guild.name));
	var defaultChannel = bot.channels.get(guild.id);
	defaultChannel.sendMessage("Hello! I'm Matrix. Someone invited me here. To view my commands do " + PREFIX + "help!\nGive me a role with manage roles, manage guild, and administrator.");
	owner.sendMessage("I joined " + guild.name);
});

bot.on('warn', (warning) => {
	const owner = bot.users.get(config.owner);
	owner.sendMessage(warning);
});

process.on("unhandledRejection", err => {
	console.error("Uncaught Promise Error: \n" + err.stack);
	const owner = bot.users.get(config.owner);
	owner.sendMessage(err);
});

bot.login(config.token);