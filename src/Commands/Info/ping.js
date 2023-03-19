const {EmbedBuilder} = require("discord.js");


module.exports = {
  
      name: 'ping',
      description: 'Returns the ping of bot',
   
  
  async run (client, interaction) {
    
    const embed = new EmbedBuilder()
      .setDescription(`**pong! - ${client.ws.ping}**`);
      interaction.followUp({embeds:[embed]});
  }
};