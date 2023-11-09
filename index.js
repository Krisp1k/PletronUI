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

const triggerWords = ["LP", "lp", "Lp", "lP"]

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'))

    for (const file of functionFiles)
        require(`./src/functions/${folder}/${file}`)(client)
}

client.on('messageCreate', (msg) => {

    const containsTriggerWord = triggerWords.some(prefix => msg.content.includes(prefix));
    const msgAuthor = msg.author.id

    // co se asi stane, když bude mockovat zia lpho a lp ziu? :thinking:
    // keep commented else it will crash
    if (msg.author.bot) { 
        return ;
    }

    // odpovedi
    if (containsTriggerWord || msgAuthor == "861583144289042472") {
        client.randomPletronReply().then((reply) => {
            try {
                msg.channel.send(reply)
            } catch (error) {
                console.log(error)
            }
        })
    }

    // mock
    if (msg.attachments.size <= 0) { //kontrola, aby nemockoval obrázek (neumí to a crashne)
        try {
            const mockData = JSON.parse(fs.readFileSync('src/data/mock.json', 'utf8')) || {} ;
            if (mockData["mocked"][msgAuthor]) {
                msg.channel.send(msg.content)
            }
        } catch (error) {
            console.log("Mock failed, error: ", error)
        }
    }
})

client.handleEvents()
client.handleCommands()
client.login(process.env.TOKEN)