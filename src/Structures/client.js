const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require('../../config.json');
const gib = GatewayIntentBits;
const { Configuration, OpenAIApi } = require("openai");
const eventHandler = require("./handlers/Events");
const slashHandler = require("./handlers/SlashCommands.cjs");
const logger = require("../logger");
const Database = require("../Structures/Database/connect")

const client = new Client({
  failIfNotExists: true,
  allowedMentions: {
    parse: ['roles', 'users'],
    repliedUser: false,
  },
  intents: [
    gib.Guilds,
    gib.GuildMessageTyping,
    gib.GuildMessages,
    gib.MessageContent
  ]
});


client.slashCommands = new Collection();

const configuration = new Configuration({
  apiKey: `${config.apikey}`

});
const openai = new OpenAIApi(configuration);

client.openai = openai;
client.logger = new logger();

new Database(client).connect();
new eventHandler(client).start();
new slashHandler(client).initCommands();

client.login(config.token);

