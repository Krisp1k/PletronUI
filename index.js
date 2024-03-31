require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
	],
});

client.commandArray = [];
client.commands = new Collection();
client.startTime = new Date(); // v ms

const triggerWord = "LP";

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith(".js"));

	for (const file of functionFiles)
		require(`./src/functions/${folder}/${file}`)(client);
}

client.on("messageCreate", async (msg) => {

	const msgAuthor = msg.author.id;
	if (msg.author.bot && msg.author.id != "1158467740672208969") return;

	msg.content = msg.content.trim();
	const containsTriggerWord = msg.content.toLowerCase().includes(triggerWord.toLowerCase());
	const isTriggerWord = msg.content.toLowerCase() === triggerWord.toLowerCase();

	// custom andry reply
	if (msg.channel.id == "1223380151203659856" && msg.author.id == "1158467740672208969") {
		console.log("andry mluvi")
		try {
			const gptReply = (await import("./src/config/OpenAI_API.mjs")).gptReply;
			const response = await gptReply(msg.content, true);
			setTimeout(() => {
				msg.channel.send(response);
			}, 30000);
		} catch (error) {
			console.log(error);
		}
	}

	// REPLIES
	if (isTriggerWord || (containsTriggerWord && msg.content.length <= 5)) {
		// pokud zprava je pouze "lp", tak nebudeme odpovidat pres GPT api
		await client.randomPletronReply().then((reply) => {
			msg.channel.send(reply);
		});

	} else if (containsTriggerWord) {
		// pokud zprava obsahuje "lp", ale zaroven to neni pouze samotne slovo, tak si hodime kostkou, zda odpovime random reply nebo pres GPT api
		try {
			if (Math.random() < 0.25) { // 75% šance na GPT ?
				await client.randomPletronReply().then((reply) => {
					msg.channel.send(reply);
				});
			} else {
				const gptReply = (await import("./src/config/OpenAI_API.mjs")).gptReply;
				const response = await gptReply(msg.content, false);
				msg.reply(response);
			}
		} catch (error) {
			console.log(error);
		}
	}

	// MOCK
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