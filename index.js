const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS'], partials: ['MESSAGE', 'CHANNEL', 'REACTION'], });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

sadWords = ["sad", "depressed", "unhappy", "angry", "miserable"]

encouragements = [ "Cheer up!", "Hang in there.", "Things can only go up!"]


client.on('messageCreate', async message => {
	//console.log(message);
	if (message.content === 'ping') {
		message.reply('pong');
	}
	if (message.mentions.has(client.user.id)) {
		message.reply("Why the hell you @'n me? Use your / key");
	  }  
	if (sadWords.some(word => message.content.includes(word))) {
		const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
		message.reply(encouragement)
	} 
  })

client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	//console.log(interaction);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	
});

// Login to Discord with your client's token
client.login(token);