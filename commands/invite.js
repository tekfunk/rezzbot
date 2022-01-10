const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Get the RESOLVE Discord invite link'),
	async execute(interaction) {
		await interaction.reply('https://discord.gg/rzlv');
	},
};