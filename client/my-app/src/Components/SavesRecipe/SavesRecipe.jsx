import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import "./SavesRecipe.css";
import ExitImage from "../Assets/exit.png";
import GarbageImage from "../Assets/garbage.png";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:8080/"; //URL of server.
function SavesRecipe() {
  let Location = useLocation();
  const navigate = useNavigate();
  const maxButtonsPerRow = 5;
  const { state } = Location;
  const [id, setId] = useState(state.id_num);
  const [buttonData, setButtonData] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [recipeGot, setRecipeGot] = useState(false);
  const [message, setmessage] = useState("");
  const [feedback, setfeedback] = useState("");
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    // Fetch the button data from the server
    getSavesRecipes().then((data) => {
      setButtonData(data);
    });
  }, []);

  const buttonRows = [];
  for (let i = 0; i < buttonData.length; i += maxButtonsPerRow) {
    const rowButtons = buttonData.slice(i, i + maxButtonsPerRow);
    buttonRows.push(rowButtons);
  }

  const getSavesRecipes = async () => {
    const res = await fetch(baseUrl + "getSavesRecipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: id,
      }),
    });
    const data = await res.json();
    if (data.length == 0) {
      setmessage("Nothing to present");
    } else {
      setmessage("");
    }
    return data;
  };

  const handleButtonClick = (text, name) => {
    // Handle button click here
    setRecipeGot(true);
    setRecipe(text);
    setRecipeName(name);
  };

  const deleteRecipe = async (event) => {
    event.preventDefault();
    const res = await fetch(baseUrl + "deleteRecipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: id,
        recipeName: recipeName,
      }),
    });
    const data = await res.json();
    setfeedback(`${recipeName} deleted`);
  };

  const exitPopup = (event) => {
    event.preventDefault();
    getSavesRecipes();

    setRecipeGot(false);
  };

  // const notify = () => toast("Wow so easy!");

  return (
    <div className="SavesRecipe">
      {/* <button>Notify!</button> */}
      {buttonRows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((button, index) => (
            <button
              id="btn-map"
              key={index}
              onClick={() => handleButtonClick(button.text, button.name)}
            >
              {button.name}
            </button>
          ))}
        </div>
      ))}
      <Popup trigger={recipeGot}>
        <img id="my-exit-btn" src={ExitImage} onClick={exitPopup}></img>
        <h6>{recipe}</h6>
        <img
          // id="my-button-del"
          alt="Button"
          class="button-img"
          src={GarbageImage}
          onClick={deleteRecipe}
        ></img>
        <p id="my-feedback">{feedback}</p>
      </Popup>
      <p id="my-p">{message}</p>
    </div>
  );
}

export default SavesRecipe;
