import { OpenRouter } from "@openrouter/sdk";

const sendRequest = async (userReq) => {
  try {
    console.log(process.env.CHAT_BOT_API_KEY);

    const openRouter = new OpenRouter({
      apiKey: process.env.CHAT_BOT_API_KEY,
    });

    const completion = await openRouter.chat.send({
      chatGenerationParams: {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: userReq,
          },
        ],
        stream: false,
      },
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};

export { sendRequest };
