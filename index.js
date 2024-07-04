require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

client.logMessages = [];
client.commandArray = [];
client.commands = new Collection();
client.startTime = new Date(); // v ms
client.env = process.env;

const functionFolders = fs.readdirSync(path.join(__dirname, 'src', 'functions'));
for (const folder of functionFolders) {
    const functionFolderPath = path.join(__dirname, 'src', 'functions', folder);
    const functionFiles = fs
        .readdirSync(functionFolderPath)
        .filter((file) => file.endsWith('.js'));

    for (const file of functionFiles) {
        const filePath = path.join(functionFolderPath, file);
        require(filePath)(client);
    }
}

const triggerWord = 'LP';
client.on('messageCreate', async (msg) => {
    const msgAuthor = msg.author.id;
    if (msg.author.bot && msg.author.id != '1158467740672208969') return;

    msg.content = msg.content.trim();
    const containsTriggerWord = msg.content.toLowerCase().includes(triggerWord.toLowerCase());

    // REPLIES
    if (containsTriggerWord && msg.content.length <= 5) {
        // pokud zprava je pouze "lp", tak nebudeme odpovidat pres GPT api
        await client.randomPletronReply().then((reply) => {
            msg.channel.send(reply);
        });
    } else if (containsTriggerWord) {
        // pokud zprava obsahuje "lp", ale zaroven to neni pouze samotne slovo, tak si hodime kostkou, zda odpovime random reply nebo pres GPT api
        if (Math.random() < 0.25) { // 75% šance na GPT ?
            await client.randomPletronReply().then((reply) => {
                msg.channel.send(reply);
            });
        } else {
            await client.gpt.reply(msg.content, client).then((gptReply) => {
                msg.channel.send(gptReply);
            });
        }
    }

    // MOCK
    // kontrola, aby nemockoval stickery (neumí to a crashne) [Discord API to nema vyresene asi]
    if (msg.stickers.size <= 0) {
        try {
            const mockDataPath = path.join(__dirname, 'src', 'data', 'mock.json');
            const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8')) || {};

            if (mockData['mocked'][msgAuthor]) {
                if (msg.content == '' || msg.content == null) {
                    await msg.channel.send(':thinking:');
                } else {
                    await msg.channel.send(msg.content);
                }

                if (msg.attachments.size > 0) {
                    msg.attachments.forEach(async (attachment) => {
                        await msg.channel.send(attachment.url);
                    });
                }
            }
        } catch (error) {
            client.log('ERROR', error.message, 'Mock');
        }
    }
});

client.handleEvents();
client.handleCommands();
client.login(client.env.TOKEN);