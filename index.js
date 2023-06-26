import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from "dotenv"
import fs from 'fs'
import UserService from './user.service.js';
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
const collection = db.collection('users');

app.get('/db_request', async (req, res) => {
  const arrUsers = await collection.find({}).toArray();
  console.log(arrUsers);
  res.json(arrUsers) //send the array as a json file to client.
})

app.post('/register', async (req, res) => {
  try {
    const { email, password, alergias } = req.body;
    res.json(await UserService.registerUser(email, password, alergias))
  } catch (error) {
    res.json(false)
  }
})

app.post('/getSavesRecipes', async (req, res) => {
  console.log("dani getSavesRecipes")
  const { email } = req.body;
  console.log(email)
  res.json(await UserService.getRecipes(email)) //send the array as a json file to client.
})

app.post("/save_recipe", async (req, res) => {
  console.log("save_recipe ")
  const feedback = "recipe has added";
  try {
    const { email, name } = req.body;
    console.log(req.body)
    const text = fs.readFileSync('dataNew.txt', 'utf8');
    const userRecipe = await UserService.checkRecipe(email)
    if (userRecipe == null) {
      console.log("dani here" + userRecipe)
      const successRes = await UserService.addRecipePerUser(email, [{ name: name, text: text }]);
    } else {
      console.log("dani not null")
      await UserService.addNewRecipePerUser(email, { name: name, text: text });
    }
  } catch (error) {
    throw error
  }
  console.log('Text file saved to MongoDB')
  return res.json({ feedback: feedback }) //send the array as a json file to client.
});

app.post("/chatGpt", async (req, res) => {

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




