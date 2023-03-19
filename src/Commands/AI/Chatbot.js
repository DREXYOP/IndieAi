const {PermissionsBitField, ApplicationCommandOptionType} = require("discord.js");

const Ignore = require("../../Structures/Database/Models/chatbot");

module.exports = {
  
      name: 'chatbot',
      description: 'enables/disables the chat bot',
      options: [{
        name: "type",
        required: true,
        type: ApplicationCommandOptionType.String,
        description: "enables or disables the chat bot",
        choices: [
          {
          name: 'rude',
          value: "rude",
        },
        {
          name: 'soft',
          value: "soft"
        }
      ]
      },{
        name: "mode",
        required: true,
        type: ApplicationCommandOptionType.String,
        description: "enables or disables the chat bot",
        choices: [
          {
          name: 'enable',
          value: "enable",
        },
        {
          name: 'disable',
          value: "disable"
        }
      ]
      }],
   
  
  async run (client, interaction) {
     const mode = interaction.options.getString('mode');
     const type = interaction.options.getString('type');
     if(!interaction.memberPermissions.has([PermissionsBitField.Flags.ManageGuild])) return interaction.followUp('You don\'t have the \`ManageGuild\` permission.');
     if(mode === "enable"){
      const data = await Ignore.findOne({channelId:interaction.channel.id})
      if(!data){
        await Ignore.create({   channelId:interaction.channel.id , type: type});
        interaction.followUp(`Enabled the \`${type}\` ChatBot for this channel.`)
      }else{
        return interaction.followUp(`ChatBot \`${data.type}\` is enabled for this channel first disable the \`${data.type}\` chatbot to enable another chatbot.`)
      }
     }else{
      const data = await Ignore.findOne({channelId:interaction.channel.id})
      if(data){
        await Ignore.deleteOne({channelId:interaction.channel.id});
      interaction.followUp(`Disabled ChatBot \`${type}\` for this channel.`)
      }else{
        interaction.followUp("ChatBot is already disabled for this channel.")
      }
      
     }
     
      
      
  }
};