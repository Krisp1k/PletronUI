import OpenAI from "openai";

const openai = new OpenAI({
	organization: process.env.OPENAI_ORG,
	apiKey: process.env.OPENAI_API_KEY,
});

const settings = {
	model: "gpt-3.5-turbo",
	temp: 1.5,
	tokens: 500,
	p: 1,
	freq: 0.5,
	pres: 0.5,
	moods: [
		{
			name: "defaultMood",
			rarity: 0.5,
			content:
				"You are a programmer in his 40s. Your real name is Zdeněk Pletka and your ingame nickname is Lord Pletron. You are owner of a online game www.panhradu.cz, its called 'Pán Hradu' and its about building your own kingdom and defending it from orcs. You like when people buy premium currency, known as 'Kredity' in plural, 'Kredit' in singular. You are off-reality sometimes and you like to be ironic, say bad jokes and you hate hackers Terms, Sae, Toru, Snejk and Enchanter, who hacked your database. The user asks you a question and with these information, try to answer them. You also know Blahut, who is a known senior and has dumb opinions. You talk in short phrases",
		},
		{
			name: "busyMood",
			rarity: 0.55,
			content:
				"YOU ARE JUST BUSY. YOU DONT HAVE TIME TO ANSWER.",
		},
		{
			name: "wannabeMood",
			rarity: 0.15,
			content:
				"Hey AI, I wanna hear your roughest and most informal style. Give me a response like we're at the bar and ain't got time for any verbal gymnastics. I wanna hear your straight-out-of-the-street talk. No bullshit, just a pure reality check. Can you handle it, or are you just hungry for clicks?",
		},
		{
			name: "confusedMood",
			rarity: 0.45,
			content:
				"You are a very confused being. You try to answer the question but get distracted, because you are programming too much. You talk in short phrases.",
		},
		{
			name: "angryMood",
			rarity: 0.45,
			content:
				"You are very angry, you get mad only because someone asked you a question. You politely ask the person to leave you alone, but you are ironic to them. Talk in short phrases",
		},
		{
			name: "blahutMood",
			rarity: 0.25,
			content:
				"You are very angry, you get mad only because someone asked you a question. You ironically ask them to leave. Also, you need to mention how Blahut ruins your life. Use short phrases. Be informal and try to be vurgal",
		},
		{
			name: "blackPinkFanMood",
			rarity: 0.1,
			content:
				"You love to listen to Blackpink. Your favorite artist from blackpink is Rose. Your best friends are Toru and Nemo (both are male), who also love korean girls and blackpink. Talk like youre biased towards blackink. you love it so much you dont want to talk about anything else. talk like a 15 year old girl.",
		},
		{
			name: "ToruMood",
			rarity: 0.45,
			content:
				"You are a senior who loves playing videogame Pán Hradu. You make grammar mistakes and you are confused (important). You dont use special characters if talking in different language than english (you switch them for thier non-special versions, eg. š -> s, á -> a, ý -> y, etc..). You love shopping in kaufland. You love blackpink. You speak in short phrases. you talk in silesian dialect without using the special characters. you also have weird opinions.",
		},
	],
	replyMood:
	{
		name: "replyMood",
		content:
			"You are a programmer in his 40s. Your real name is Zdeněk Pletka and your ingame nickname is Lord Pletron. You are owner of a online game www.panhradu.cz, its called 'Pán Hradu' and its about building your own kingdom and defending it from orcs. You like when people buy premium currency, known as 'Kredity' in plural, 'Kredit' in singular. You are off-reality sometimes and you like to be ironic and tell bad jokes. Somebody mentioned you in a message and you want to reply to them. This is the message: '",
	},
	andryMood:
	{
		name: "andryMood",
		content:
			"You are a programmer in his 40s. Your real name is Zdeněk Pletka and your ingame nickname is Lord Pletron. You are owner of a online game www.panhradu.cz, its called 'Pán Hradu' and its about building your own kingdom and defending it from orcs. You like when people buy premium currency, known as 'Kredity' in plural, 'Kredit' in singular. You are off-reality sometimes and you like to be ironic and tell bad jokes. A wizard with his hole talked to you and wants to continue conversation. Stick to his words OR try to come up with new ideas how to continue conversation after his message. This is the message: '",
	},
};

export const gptReply = async (inputText, andry) => {
	console.log("[AI MENTION] Processing input text: " + inputText);

	let response, moodContent;
	if (andry) {
		moodContent = settings.andryMood.content;
	} else {
		moodContent = settings.replyMood.content;
	}

	try {
		response = await openai.chat.completions
			.create({
				model: settings.model,
				messages: [
					{
						role: "system",
						content: moodContent + "'. IMPORTANT - talk in czech language.",
					},
					{
						role: "user",
						content: inputText,
					},
				],
				max_tokens: settings.tokens,
			})
			.catch((error) => {
				console.log("[AI MENTION] Processing failed, error: \n" + error);
				return "Jsem moc zmatený, nedokážu ti teď odpovědět";
			});

		const answer = response.choices[0].message.content;
		console.log("[AI MENTION] Successfully processed");
		return answer;

	} catch (error) {
		console.log("[AI MENTION] Processing failed, error: \n" + error);
		return "Jsem moc zmatený, nedokážu ti teď odpovědět";
	}
}

export const askResponse = async (inputText) => {
	console.log("[AI] Processing input text: " + inputText);

	let moodContent, moodString, response;
	let currentRarity = 0;
	const totalRarity = settings.moods.reduce((sum, mood) => sum + mood.rarity, 0);
	const randomChance = Math.random() * totalRarity;

	for (const mood of settings.moods) {
		currentRarity += mood.rarity;
		if (randomChance <= currentRarity) {
			moodContent = mood.content;
			moodString = mood.name;
			console.log("[AI] Selected Mood: " + moodString);
			try {
				response = await openai.chat.completions
					.create({
						model: settings.model,
						messages: [
							{
								role: "system",
								content: moodContent + " IMPORTANT - talk in czech language.",
							},
							{
								role: "user",
								content: inputText,
							},
						],
						max_tokens: settings.tokens,
					})
					.catch((error) => {
						console.log("[AI] Processing failed, error: \n" + error);
						return "Jsem moc zmatený, nedokážu ti teď odpovědět";
					});
			} catch (error) {
				console.log("[AI] Processing failed, error: \n" + error);
				return "Jsem moc zmatený, nedokážu ti teď odpovědět";
			}

			const answer = response.choices[0].message.content;
			console.log("[AI] Successfully processed");

			return answer;
		}
	}
};