import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {config} from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
//import readline from "readline"

const openAi = new OpenAIApi(
  new Configuration({
    organization: process.env.API_ORG,
    apiKey: process.env.API_KEY,
  })
)

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

app.post("/", async(req,res) => {

  const { message } = req.body;
  const completion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role:"user", content: `${message}`}],
    })
    res.json({
      completion :completion.data.choices[0].message})

});

app.listen(port, () => {
  console.log(`listen to port: ${port}`)
})




     