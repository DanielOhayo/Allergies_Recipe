import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Popup from "./Popup";
import ExitImage from "../Assets/exit.png";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/"; //URL of server.
function HomePage() {
  let Location = useLocation();
  const navigate = useNavigate();

  const { state } = Location;

  const [id, setId] = useState(state.id_num);
  const [alergias, setAlergias] = useState(state.alergias);

  const [GlutenCheck, setGlutenFreeChecked] = useState(false);
  const [NutsCheck, setNutsChecked] = useState(false);
  const [MilkCheck, setMilkChecked] = useState(false);
  const [EggsCheck, setEggsChecked] = useState(false);
  const [SesameCheck, setSesameChecked] = useState(false);

  const [text, setText] = useState("");
  const [textAler, setTextAler] = useState("");

  const [recipeFromChat, setRecipeFromChat] = useState("");

  const [nameRecipe, setNameRecipe] = useState("");
  const [feedbackSave, setFeedbackSave] = useState("");
  const [recipeGot, setRecipeGot] = useState(false);

  const [saveButton, setSaveButton] = useState(false);
  const [pressedButton, setPressedButton] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [allergiesObj, setAllergiesObjs] = useState([]);

  let askedTemplate = "";
  let alternative = "";

  useEffect(() => {
    async function getAller() {
      const res = await fetch(baseUrl + "getAller/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: id,
        }),
      });
      const data = await res.json();
      setSelectedNames(data.alergies);
    }
    async function getAllergiesObj() {
      const res = await fetch(baseUrl + "getAllergiesObj/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setAllergiesObjs(data);
    }
    getAller();
    getAllergiesObj();
  }, []);

  let pressedBtn = [];
  const alerArray = allergiesObj;
  const handleCheckboxChange = (name) => {
    let updatedSelectedNames;

    if (selectedNames.includes(name)) {
      updatedSelectedNames = selectedNames.filter(
        (selectedName) => selectedName !== name
      );
    } else {
      updatedSelectedNames = [...selectedNames, name];
    }

    setSelectedNames(updatedSelectedNames);

    for (let i = 0; i < alerArray.length; i++) {
      if (updatedSelectedNames.includes(alerArray[i])) {
        // Perform specific actions when 'John' checkbox is clicked
        console.log(`${alerArray[i]} checkbox clicked`);
        pressedBtn.push(alerArray[i]);
        // You can add any other actions or logic here
        console.log(pressedBtn);
        setPressedButton(pressedBtn);
      }
    }
  };
  async function getChatGptAns(e) {
    e.preventDefault();
    setRecipeFromChat("We got your asked, loading ...");
    for (let i = 0; i < pressedButton.length; i++) {
      alternative += "without " + pressedButton[i] + " ";
    }
    if (textAler != "") {
      alternative += "without " + textAler + " ";
    }
    askedTemplate = `Hi ChatGPT, I'm looking for a recipe for homemade ${alternative} ${text}. Can you help me with that?`;
    alternative = "";

    const res = await fetch(baseUrl + "chatGpt/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: askedTemplate,
      }),
    });
    const data = await res.json();

    setSaveButton(
      <button id="my-openPopUp-btn" onClick={openPopUpForSave}>
        Click here to save the recipe
      </button>
    );
    setRecipeFromChat(data.completion);
  }

  const openPopUpForSave = (event) => {
    event.preventDefault();
    setRecipeGot(true);
  };

  const exitPopup = (event) => {
    event.preventDefault();
    setRecipeGot(false);
  };
  const mainInput = (event) => {
    setText(event.target.value);
  };

  const alerInput = (event) => {
    setTextAler(event.target.value);
  };

  const recipeInput = (event) => {
    setNameRecipe(event.target.value);
  };

  async function saveRecipeCB(event) {
    setSaveButton("");
    event.preventDefault();
    const res = await fetch(baseUrl + "save_recipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: id,
        name: nameRecipe,
      }),
    });
    const data = await res.json();
    setFeedbackSave(data.feedback);
  }

  return (
    <div className="HomePage">
      <form action="">
        <h4>Search your recipe:</h4>
        <input type="text" id="mainRecipe" value={text} onChange={mainInput} />
        <button id="submit" disabled={text.length == 0} onClick={getChatGptAns}>
          give me recipe{" "}
        </button>
        <h4>Choose your allergies</h4>
        {alerArray.map((name, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedNames.includes(name)}
                onChange={() => handleCheckboxChange(name)}
              />
              {name}
            </label>
          </div>
        ))}
        <label>
          <h4>
            Other:
            <input
              type="text"
              id="aller"
              value={textAler}
              onChange={alerInput}
            />
          </h4>
        </label>
        <h>{recipeFromChat}</h>
        <h>{saveButton}</h>
        <Popup trigger={recipeGot}>
          <img id="my-exit-btn" src={ExitImage} onClick={exitPopup}></img>
          <h id="titleRecipeSave">choose the recipe name:</h>
          <input
            type="text"
            id="saveRecipe"
            value={nameRecipe}
            onChange={(event) => recipeInput(event)}
          />
          <button onClick={saveRecipeCB}>save recipe </button>
          <h6>{feedbackSave}</h6>
        </Popup>
      </form>
    </div>
  );
}

export default HomePage;
