module.exports = {
	main: function(bot, message) {
		//['primary_arg', ['array', 'of', 'secondary', 'arguments']]
		
		var config = require('../config.json');
		var isCommander = config.admins;
		
		if (isCommander.indexOf(message.author.id) > -1){
			var command = message.content;
			try {
				var commandString = command[0];
				if (command.length == 2) 
					{ otherArgs = command[1]; otherArgs.forEach( function(s) { commandString += " " + s;  }); }
			}
			catch(err) {
				message.channel.sendMessage("Please execute commands in the format ``['primary_arg', ['array', 'of', 'secondary', 'arguments']]`` !")
			}
			
			var spawn = require('child_process').spawn;
			var child = spawn.apply(this, command);
			message.channel.sendMessage("Console Output for `" + commandString + "`");

			child.stdout.on('data', data => { message.channel.sendMessage("`" + data + "`"); });
			child.stderr.on('data', data => { message.channel.sendMessage("`" + data + "`");  });
			child.on('close', code => {console.log( "child process exited with code `${code}`" );});
		}
	}
};