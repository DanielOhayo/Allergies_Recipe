import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from "dotenv"
import fs from 'fs'

import db from './db.js';

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

//Login Queries:

app.post('/get_user/', (req, res) => {
  const { user_logged_in } = req.body
  if (!user_logged_in)
    return res.status(400).send({ status: 'failed' })
  res.status(200).send({ status: 'recieved' })
})
const collection = db.collection('user');

// Retrieve all documents from the collection

app.get('/db_request', async (req, res) => {
  // db.collection('user').insertOne({ email: "dani", password: "1" })
  // Print the list of users to the console

  const arrUsers = await collection.find({}).toArray();
  console.log(arrUsers);
  res.json(arrUsers) //send the array as a json file to client.
})

app.post("/here/", async (req, res) => {

  console("here")
  return res.status(400).send({ status: 'failed', feedback: feedback })
});

app.post("/", async (req, res) => {

  const { message } = req.body;
  console.log("dani " + message)
  const completion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${message}` }],
  })
  console.log(completion.data.choices[0].message.content)
  res.json({
    completion: file_design(completion.data.choices[0].message.content)
  })

});

function file_design(answer) {
  fs.writeFile('data.txt', answer, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  console.log(answer)
  let fileContents = answer

  const specifiedWord = 'Ingredients:';
  const index = fileContents.indexOf(specifiedWord);
  let wordToFind = "please"
  if (answer.includes(wordToFind)) {
    console.log(`The word "${wordToFind}" was found in the file.`);
    return answer;
  } else {
    console.log(`The word "${wordToFind}" was not found in the file.`);
  }
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




