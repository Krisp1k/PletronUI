require('dotenv').config()

const { Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})
client.commands = new Collection()
client.commandArray = []

const prefixes = ["LP", "lp", "Lp", "lP"]

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'))

    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client)
}

client.on('messageCreate', (msg) => {

    const startsWithPrefix = prefixes.some(prefix => msg.content.startsWith(prefix));

    if (msg.author.bot) { return }

    // odpovedi
    if (startsWithPrefix) {
        const replyPromise = client.randomPletronReply().then((reply) => {
            msg.channel.send(reply)
        })
    }

    // mock
    const msgAuthor = msg.author.id
    
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

client.handleEvents()
client.handleCommands()
client.login(process.env.TOKEN)