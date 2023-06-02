require('dotenv').config()

const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans
    ]
})
client.commands = new Collection()
client.commandArray = []
client.startTime = null
client.startTime = new Date(); // v ms

const prefixes = ["LP", "lp", "Lp", "lP"]

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'))

    for (const file of functionFiles)
        require(`./src/functions/${folder}/${file}`)(client)
}

client.on('messageCreate', (msg) => {

    const containsPrefix = prefixes.some(prefix => msg.content.includes(prefix));
    const msgAuthor = msg.author.id

    // co se asi stane, když bude mockovat zia lpho a lp ziu? :thinking:
    if (msg.author.bot) { 
        return ;
    }

    // odpovedi
    if (containsPrefix || msgAuthor == "861583144289042472") {
        client.randomPletronReply().then((reply) => {
            msg.channel.send(reply)
        })
    }

    // mock
    readFirstRow('src/data/mock.txt')
        .then((firstRow) => {
            if (firstRow == msgAuthor) {
                msg.channel.send(msg.content)
            }
        })
})

function readFirstRow(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            const rows = data.trim().split('\n');
            const firstRow = rows[0];
            resolve(firstRow);
        });
    });
}

const token = process.env.TOKEN;
console.log(token) // this logs out the correct token

client.handleEvents()
client.handleCommands()
client.login(process.env.TOKEN)