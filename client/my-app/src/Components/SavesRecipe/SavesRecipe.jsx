import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./SavesRecipe.css";
import ExitImage from "../Assets/exit.png";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/"; //URL of server.
function SavesRecipe() {
  let Location = useLocation();
  const navigate = useNavigate();

  const { state } = Location;
  const [id, setId] = useState(state.id_num);
  const [buttonData, setButtonData] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [recipeGot, setRecipeGot] = useState(false);

  function backToLogin() {
    navigate("/", {});
  }

  useEffect(() => {
    // Fetch the button data from the server
    getSavesRecipes().then((data) => {
      setButtonData(data);
    });
  }, []);

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
    return data;
  };

  const handleButtonClick = (text) => {
    // Handle button click here
    setRecipeGot(true);
    setRecipe(text);
  };

  const exitPopup = (event) => {
    event.preventDefault();
    setRecipeGot(false);
  };

  return (
    <div className="SavesRecipe">
      <button id="my-button-back" onClick={backToLogin}>
        Back to login
      </button>
      {buttonData.map((button, index) => (
        <button key={index} onClick={() => handleButtonClick(button.text)}>
          {button.name}
        </button>
      ))}
      <Popup trigger={recipeGot}>
        <img id="my-exit-btn" src={ExitImage} onClick={exitPopup}></img>
        <h6>{recipe}</h6>
      </Popup>
    </div>
  );
}

export default SavesRecipe;
