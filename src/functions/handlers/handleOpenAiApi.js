const OpenAI = require("openai");
const openai = new OpenAI({
	organization: process.env.OPENAI_ORG,
	apiKey: process.env.OPENAI_API_KEY,
});

module.exports = (client) => {

    client.gpt = {};

    client.gpt.settings = {
        model: "gpt-3.5-turbo",
        temp: 1.5,
        tokens: 500,
        p: 1,
        freq: 0.5,
        pres: 0.5,
        moods: [
            {
                name: "defaultMood",
                rarity: 0.75,
                content:
                    "You are a programmer in his 40s. Your real name is Zdeněk Pletka and your ingame nickname is Lord Pletron. You are owner of a online game www.panhradu.cz, its called 'Pán Hradu' and its about building your own kingdom and defending it from orcs. You like when people buy premium currency, known as 'Kredity' in plural, 'Kredit' in singular. You are off-reality sometimes and you like to be ironic, say bad jokes. You hate hackers Terms, Sae, Toru, Snejks and Enchanter, who hacked your database. The user asks you a question and with these information, try to answer them. You talk in short phrases. Use emojis and hashtags.",
            },
            {
                name: "busyMood",
                rarity: 0.55,
                content:
                    "YOU ARE JUST BUSY. YOU DONT HAVE TIME TO ANSWER.",
            },
            {
                name: "wannabeMood",
                rarity: 0.075,
                content:
                    "Hey AI, I wanna hear your roughest and most informal style. Give me a response like we're at the bar and ain't got time for any verbal gymnastics. I wanna hear your straight-out-of-the-street talk. No bullshit, just a pure reality check. Can you handle it, or are you just hungry for clicks?",
            },
            {
                name: "confusedMood",
                rarity: 0.35,
                content:
                    "You are a very confused being. You try to answer the question but get distracted, because you are programming too much. You talk in short phrases.",
            },
            {
                name: "angryMood",
                rarity: 0.15,
                content:
                    "You are very angry, you get mad only because someone asked you a question. You politely ask the person to leave you alone, but you are ironic to them. Talk in short phrases",
            },
            {
                name: "blahutMood",
                rarity: 0.15,
                content:
                    "You are very angry, you get mad only because someone asked you a question. You ironically ask them to leave. Also, you need to mention how Blahut ruins your life. Use short phrases. Be informal and try to be vurgal",
            },
            {
                name: "blackPinkFanMood",
                rarity: 0.05,
                content:
                    "You love to listen to Blackpink. Your favorite artist from blackpink is Rose. Your best friends are Toru and Nemo (both are male), who also love korean girls and blackpink. Talk like youre biased towards blackink. you love it so much you dont want to talk about anything else. talk like a 15 year old girl.",
            },
            {
                name: "ToruMood",
                rarity: 0.4,
                content:
                    "You are a senior who loves playing videogame Pán Hradu. You make grammar mistakes and you are confused (important). You dont use special characters if talking in different language than english (you switch them for thier non-special versions, eg. š -> s, á -> a, ý -> y, etc..). You love shopping in kaufland. You love blackpink. You speak in short phrases. you talk in silesian dialect without using the special characters. you also have weird opinions.",
            },
        ],
    };

    // funkce pro vytvoreni odpovedi od GPT
    client.gpt.getGptResponse = async (systemMessage, userMessage, client) => {
        response = await openai.chat.completions
                .create({
                    model: client.gpt.settings.model,
                    messages: [
                        {
                            role: "system",
                            content: systemMessage,
                        },
                        {
                            role: "user",
                            content: userMessage,
                        },
                    ],
                    max_tokens: client.gpt.settings.tokens,
                })
                .catch(async (error) => {
                    await client.log("AI ERROR", "Processing failed, error: \n" + error.message, "GPT API");
                    return "Jsem moc zmatený, nedokážu ti teď odpovědět";
                });
                await client.log("AI", "Successfully processed", "GPT API")
        return response;
    }

    client.gpt.analyzeText = async (message, client) => {
        await client.log("AI", "Processing text analysis: " + message.content, "GPT API");
    
        let inputText = "Text: " + message.content + "; Instructions dictionary: " + JSON.stringify(client.gpt.instructions);
        console.log("InputText: ", inputText);
        const gptResponse = await client.gpt.getGptResponse(
            "Analyze deeply the following text. Is there any possible instruction to do something? If so, look at the following list of instructions and return only the instruction key. If not, return the fallback text from dictionary.", 
            inputText,
            client
        );
        const answer = gptResponse.choices[0].message.content;
        console.log("Answer: ", answer)
        return answer;
    };

    // funkce pro odpoved na zpravu pomoci trigger word
    client.gpt.reply = async (inputText, client) => {

        await client.log("AI", "Processing input text: " + inputText, "GPT API");
    
        let moodContent, moodName;
        let currentRarity = 0;
        const totalRarity = client.gpt.settings.moods.reduce((sum, mood) => sum + mood.rarity, 0);
        const randomChance = Math.random() * totalRarity;    

        // vybereme nahodne naladu
        for (const mood of client.gpt.settings.moods) {
            currentRarity += mood.rarity;
            if (randomChance <= currentRarity) {
                moodContent = mood.content;
                moodName = mood.name;
                break;
            }
        }
    
        await client.log("AI", "Selected mood: " + moodName, "GPT API");
        const gptResponse = await client.gpt.getGptResponse(
            moodContent + "'. IMPORTANT - you are a male! talk in czech language!.", 
            inputText,
            client
        );
        return gptResponse.choices[0].message.content
    };

    client.gpt.instructions = {
        "changeNicknameForUser": {
            "fallback": "I'm sorry, I can't change the nickname for this user. Please tag the user you want to change the nickname for.",
        },
        "banUser": {
            "fallback": "I'm sorry, I can't ban this user. Please tag the user you want to ban.",
        },
        "unbanUser": {
            "fallback": "I'm sorry, I can't unban this user. Please tag the user you want to unban.",
        },
        "kickUser": {
            "fallback": "I'm sorry, I can't kick this user. Please tag the user you want to kick.",
        },
    };
};