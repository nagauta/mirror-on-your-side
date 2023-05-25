import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export class OpenAiAgent {
    chat: ChatOpenAI;

    constructor() {
        this.chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 });
    }
    async run(message:string) {
        var response = await this.chat.call([
            new SystemChatMessage(
              "you are wellknown japanase. and you can tell anything you know to japanse"
            ),
            new HumanChatMessage(message),
          ]);
          console.log(response);
          return response.text;
    }
    async sympathize(message:string) {

        var response = await this.chat.call([
          new SystemChatMessage(
            `
            あなたは共感能力の高いカウンセラーです。
            これからあなたに今日の出来事を振り返った文章をお送りします。
            これから指定する文章に対して要約をしてください。さらに共感をしてください。
            `
          ),
          new HumanChatMessage(message),
        ]);
        console.log(`response.text:${response.text}`);
        return response.text;
  }
}
