require("dotenv").config();
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import { WebBrowser } from "langchain/tools/webbrowser";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const app = express()
const port = 3000

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
import { OpenAiAgent } from "./openaiAgent";

const cpenAiAgent = new OpenAiAgent();
app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.post('/ask', async (_req: Request, res: Response) => {
  const answerFrustrated = _req.body.answerFrustrated;
  const answerHappy = _req.body.answerHappy;
  const answerImpressed = _req.body.answerImpressed;
  const message = `"""\n今日モヤモヤしたことは、${answerFrustrated}"""です\n今日印象に残っている事は${answerHappy}です\n今日嬉しかったことは${answerImpressed}\n`
  console.log(`message: ${message}`)
  const gptResponse = await cpenAiAgent.sympathize(message);
  console.log(_req.body);
  
  return res.status(200).json({response:`${gptResponse}`});
})

app.get("/chat", async (req:any, res:any) => {

  const model = new ChatOpenAI({ temperature: 0 });
  const embeddings = new OpenAIEmbeddings(
    {}
  );

  const browser = new WebBrowser({ model, embeddings});

  const result = await browser.call(
    `"https://block.fm/news/clwp_tcyradio","この記事を300文字以内で要約せよ。また印象的なフレーズを三つ列挙すること"`
  );
  
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

