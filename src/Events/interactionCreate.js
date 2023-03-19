const { InteractionType } = require('discord.js');

module.exports= {
  name: 'interactionCreate',
  once: false,
async execute (client,interaction) {
  if (interaction.type === InteractionType.ApplicationCommand) {
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;
    await interaction.deferReply();
    


    

    //Error handling

    try {
      return await command.run(client, interaction);
    } catch (error) {
      interaction.followUp(error.message);
    }
  }
}
};