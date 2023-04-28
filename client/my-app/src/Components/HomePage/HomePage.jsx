import { myFunction } from "./create_file";
import React, { useState } from "react";
import "./HomePage.css";

// const baseUrl = 'http://localhost:8080/' //URL of server.
function HomePage() {
  const [GlutenFreeCheck, setGlutenFreeChecked] = useState(false);
  const [text, setText] = useState("");

  let askedTemplate = "";
  let alternative = "";

  function getChatGptAns(e) {
    if (GlutenFreeCheck) {
      alternative = "gluten free";
    }
    askedTemplate = `Hi ChatGPT, I'm looking for a recipe for homemade ${alternative} ${text}. Can you help me with that?`;

    myFunction(askedTemplate);
  }

  const mainInput = (event) => {
    let mainNameRecipe = event.target.value;
    setText(mainNameRecipe);
  };

  const allergiesCB = (event) => {
    setGlutenFreeChecked(event.target.checked);
  };

  return (
    <div className="HomePage">
      <form action="">
        <h2>AllerChef</h2>
        <button id="submit" disabled={text.length == 0} onClick={getChatGptAns}>
          give me recipe
        </button>
        <label>
          <input
            type="text"
            id="mainRecipe"
            value={text}
            onChange={mainInput}
          />
          search your recipe:
        </label>
        <label>
          <input
            type="checkbox"
            id="message"
            checked={GlutenFreeCheck}
            onChange={allergiesCB}
          />
          gluten free
        </label>
      </form>
      <div id="chat-log"></div>
      {/* <script src="create_file.js"></script> */}
    </div>
  );
}

export default HomePage;
