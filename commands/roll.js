const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('🎲 Test your luck, roll the dice 🎲')
        .addNumberOption(option => option.setName('sides').setDescription('Enter how many sides.')),
	async execute(interaction) {
		const value = interaction.options.getNumber('sides');
        const user = interaction.user.tag;
        const random = Math.round(Math.random() * value);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`\`${user}\` rolled a`)
            .setDescription(`🎲\`${random}\` out of a \`${value}\`🎲`)
            .setFooter({ text: 'I hope its exactly what you needed.'});;
        if (value) return interaction.reply({ embeds: [embed]});
		return interaction.reply('No option was provided!');
	},
};