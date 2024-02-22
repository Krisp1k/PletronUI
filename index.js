require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessageReactions,
    ],
});

client.commands = new Collection();
client.commandArray = [];
client.startTime = new Date(); // v ms
const triggerWords = ["LP", "lp", "Lp", "lP"];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));

    for (const file of functionFiles)
        require(`./src/functions/${folder}/${file}`)(client);
}

client.on("messageCreate", async (msg) => {
    const containsTriggerWord = triggerWords.some((prefix) =>
        msg.content.includes(prefix)
    );
    const msgAuthor = msg.author.id;

    // co se asi stane, když bude mockovat zia lpho a lp ziu? :thinking:
    // keep commented else it will crash
    if (msg.author.bot) {
        return;
    }

    // console.log(msg)

	// try {
	// 	switch (msg.author.id) {
	// 		case "301406857132769281": msg.react("<a:atomvecer:1187887385019678811>"); break;
	// 		case "586661245797531698": msg.react("🥧"); break;
	// 	}
	// } catch (error) {
	// 	console.error(`Error reacting to message: ${error.message}`);
	// }


    // odpovedi
    if (containsTriggerWord || msgAuthor == "861583144289042472") {
        await client.randomPletronReply().then((reply) => {
            try {
                msg.channel.send(reply);
            } catch (error) {
                console.log(error);
            }
        });
    }

    // kontrola, aby nemockoval stickery (neumí to a crashne) [Discord API to nema vyresene asi]
    if (msg.stickers.size <= 0) {
        try {
            const mockData =
                JSON.parse(fs.readFileSync("src/data/mock.json", "utf8")) || {};

            if (mockData["mocked"][msgAuthor]) {
                if (msg.content == "" || msg.content == null) {
                    await msg.channel.send(":thinking:");
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
            console.log("Mock failed, error: ", error);
        }
    }
});

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);