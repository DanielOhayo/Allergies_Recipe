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
  const [recipeFromChat, setRecipeFromChat] = useState("");

  const [nameRecipe, setNameRecipe] = useState("");
  const [feedbackSave, setFeedbackSave] = useState("");
  const [recipeGot, setRecipeGot] = useState(false);

  const [saveButton, setSaveButton] = useState(false);

  let askedTemplate = "";
  let alternative = "";

  useEffect(() => {
    if (alergias) {
      for (var i = 0; i < alergias.length; i++) {
        if (alergias[i] == "gluten") {
          console.log(alergias[i]);
          setGlutenFreeChecked(true);
        }
        if (alergias[i] == "nuts") {
          console.log(alergias[i]);
          setNutsChecked(true);
        }
        if (alergias[i] == "milk") {
          console.log(alergias[i]);
          setMilkChecked(true);
        }
        if (alergias[i] == "eggs") {
          console.log(alergias[i]);
          setEggsChecked(true);
        }
        if (alergias[i] == "sesame") {
          console.log(alergias[i]);
          SesameCheck(true);
        }
      }
    }
  }, []);

  async function getChatGptAns(e) {
    e.preventDefault();
    setRecipeFromChat("We got your asked, loading ...");
    if (GlutenCheck) {
      alternative += "without gluten ";
    }
    if (NutsCheck) {
      alternative += "without nuts ";
    }
    if (MilkCheck) {
      alternative += "without milk ";
    }
    if (EggsCheck) {
      alternative += "without eggs ";
    }
    if (SesameCheck) {
      alternative += "without sesame ";
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

  const recipeInput = (event) => {
    setNameRecipe(event.target.value);
  };

  const glutenAllergiesCB = (event) => {
    setGlutenFreeChecked(event.target.checked);
  };

  const nutsAllergiesCB = (event) => {
    setNutsChecked(event.target.checked);
  };

  const milkAllergiesCB = (event) => {
    setMilkChecked(event.target.checked);
  };

  const eggsAllergiesCB = (event) => {
    setEggsChecked(event.target.checked);
  };

  const sesameAllergiesCB = (event) => {
    setSesameChecked(event.target.checked);
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
        <label>
          <input
            type="checkbox"
            id="message"
            checked={GlutenCheck}
            onChange={glutenAllergiesCB}
          />
          Gluten
        </label>
        <label>
          <input
            type="checkbox"
            id="message"
            checked={NutsCheck}
            onChange={nutsAllergiesCB}
          />
          Nuts
        </label>
        <label>
          <input
            type="checkbox"
            id="message"
            checked={MilkCheck}
            onChange={milkAllergiesCB}
          />
          Milk
        </label>
        <label>
          <input
            type="checkbox"
            id="message"
            checked={EggsCheck}
            onChange={eggsAllergiesCB}
          />
          Eggs
        </label>
        <label>
          <input
            type="checkbox"
            id="message"
            checked={SesameCheck}
            onChange={sesameAllergiesCB}
          />
          Sesame
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
