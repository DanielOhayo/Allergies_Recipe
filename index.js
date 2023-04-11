import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from "dotenv"
import fs from 'fs'

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
const port = 8080;

app.use(express.static('client'))
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())



app.post("/here/", async (req, res) => {

  console("here")
  return res.status(400).send({ status: 'failed', feedback: feedback })
});

app.post("/", async (req, res) => {

  const { message } = req.body;
  const completion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${message}` }],
  })
  res.json({
    completion: file_design(completion.data.choices[0].message.content)
  })

});

function file_design(answer) {
  fs.writeFile('data.txt', answer, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  let fileContents = fs.readFileSync('data.txt', 'utf8');

  const specifiedWord = 'Ingredients:';
  const index = fileContents.indexOf(specifiedWord);
  fileContents = fileContents.slice(index);

  fs.writeFile('dataNew.txt', fileContents, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });

  return fileContents;
}

app.listen(port, () => {
  console.log(`listen to port: ${port}`)
})




