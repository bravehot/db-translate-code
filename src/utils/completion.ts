import { Configuration, OpenAIApi } from "openai";

const completion = async (prompt: string, apiKey: string) => {
  const configuration = new Configuration({
    apiKey,
  });

  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 3072,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      prompt,
      stop: ["\\n\\n"],
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log("error: ", error);
  }
};

export default completion;
