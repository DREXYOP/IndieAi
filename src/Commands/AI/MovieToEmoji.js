const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");


module.exports = {

  name: 'movietoemoji',
  description: 'Converts names of movie into emnojis.',
  options: [{
    name: "name",
    required: true,
    type: ApplicationCommandOptionType.String,
    description: "Enter the name of the movie."

  }],


  async run(client, interaction) {
    const name = interaction.options.getString('name');

    const response = await client.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \n${name}:`,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });


    await interaction.channel.sendTyping();
    await interaction.followUp(`${response.data.choices[0].text || response.data.message}`)

  }
};