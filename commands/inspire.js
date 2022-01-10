const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inspire')
		.setDescription('Some random inspiration (your results may vary)'),
	async execute(interaction) {
        getQuote().then(quote => interaction.reply('> '+quote));
        
	},
};

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json()
        })
      .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
      })
  }