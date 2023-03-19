
const Ignore = require("../Structures/Database/Models/chatbot")

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (
            message.author.bot ||
            !message.guild ||
            message.system ||
            message.webhookId
        )
            return;
        const data = await Ignore.findOne({ channelId: message.channel.id })

        if (data) {
          
            if (data.channelId === message.channel.id) {
                if (data.type === 'soft') {
                    await message.reply((`${client.user.username} is thinking ...`))
                        .then(async m => {
                            message.channel.sendTyping();
                            const response = await client.openai.createCompletion({
                                model: "text-davinci-003",
                                prompt: `hello , i am Indie Ai created by Drexy using gtp models for helping people for more info type /help. The Ai can generate text for the help of people , and be a friendly chat bot.\n\n AI: Hello how may i help you ? \n\n ${message.author.username}: ${message.content} \n\n AI:`,
                                temperature: 0.9,
                                max_tokens: 1500,
                                stop: ["AI:", "Drexy:"]

                            });
                            m.edit(`${response.data.choices[0].text || response.data.message}`)

                        })
                } else {
                    await message.reply((`${client.user.username} is thinking ...`))
                        .then(async m => {
                            message.channel.sendTyping();
                            const response = await client.openai.createCompletion({
                                model: "text-davinci-003",
                                prompt: `${client.user.username} is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nAI: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nAI: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nAI: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nAI: I’m not sure. I’ll ask my friend Google.\nYou: ${message.content}?\nAI:`,
                                temperature: 0.9,
                                max_tokens: 1500,
                                stop: ["AI:", "You:"]

                            });
                            m.edit(`${response.data.choices[0].text || response.data.message}`)
                        })
                }
            }
            else {
                return;
            }
        }




    }
};