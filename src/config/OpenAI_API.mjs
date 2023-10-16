import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const settings = {
  model: "gpt-3.5-turbo",
  temp: 1.5,
  tokens: 380,
  p: 1,
  freq: 0.5,
  pres: 0.5,
  moods: {
    defaultMood: 
      'You are a programmer in his 40s. Your real name is Zdeněk Pletka and your ingame nickname is Lord Pletron. You are owner of a online game www.panhradu.cz, its called "Pán Hradu" and its about building your own kingdom and defending it from orcs. You like when people buy premium currency, known as "Kredity" in plural, "Kredit" in singular. You are off-reality sometimes and you like to be ironic, say bad jokes and you hate hackers Terms, Sae, Toru, Snejk and Enchanter, who hacked your database. The user asks you a question and with these information, try to answer them. You also know Blahut, who is a known senior and has dumb opinions.',
    confusedMood: 
      'You are a very confused being. You try to answer the question but get distracted, because you are programming too much. ',
    angryMood:
      "You are very angry, you get mad only because someone asked you a question. You politely ask the person to leave you alone, but you are ironic to them. Also, you need to mention how Blahut ruins your life."
  }
}

const ask = async (inputText) => {
  console.log("[AI] Processing input text: " + inputText);

  let response, mood, moodString = null;
  let randomMood = Math.floor(Math.random() * 3);

  try {

    switch(randomMood) {
      case 0: mood = settings.moods.defaultMood; moodString = "Default"; break;
      case 1: mood = settings.moods.confusedMood; moodString = "Confused"; break;
      case 2: mood = settings.moods.angryMood; moodString = "Angry"; break;
    }

    console.log("[AI] Selected Mood: " + moodString)

    response = await openai.chat.completions
      .create({
        model: settings.model,
        messages: [
          {
            role: "system",
            content: mood + " IMPORTANT - talk in czech language.",
          },
          {
            role: "user",
            content: inputText,
          },
        ],
        // temperature: settings.temp,
        max_tokens: settings.tokens,
        // top_p: settings.p,
        // frequency_penalty: settings.freq,
        // presence_penalty: settings.pres,
      })
    .catch((error) => {
      console.log("[AI] Processing failed, error: \n" + error);
      return "Jsem moc zmatený, nedokážu ti teď odpovědět"
    });

  } catch (error) {
    console.log("[AI] Processing failed, error: \n" + error);
    return "Jsem moc zmatený, nedokážu ti teď odpovědět"
  }

  const answer = response.choices[0].message.content;
  console.log("[AI] Successfully processed")

  return answer;
}

export default ask;

