import {OpenAI} from "openai";

const openai = new OpenAI({
  apiKey: "api-key",
});

let chatHistory = [];

async function askQuestion(question) {
  chatHistory.push({ role: "user", content: question });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chatHistory,
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n", " user:", " AI:"],
  });

  const answer = response.choices[0].message.content;
  chatHistory.push({ role: "assistant", content: answer });

  return answer;
}

askQuestion("O que é Prompt Chain?").then((answer) =>
  console.log("Resposta:", answer)
);
