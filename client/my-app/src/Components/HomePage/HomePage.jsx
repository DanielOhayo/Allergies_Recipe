import { myFunction } from "./create_file";
import React, { useState } from "react";

// const baseUrl = 'http://localhost:8080/' //URL of server.
function HomePage() {
  const [ChocolateCakeCheck, setChocolateCakeChecked] = useState(false);
  const [GlutenFreeCheck, setGlutenFreeChecked] = useState(false);

  let askedTemplate = "";

  async function getChatGptAns(e) {
    if (ChocolateCakeCheck) {
      askedTemplate =
        "Hi ChatGPT, I'm looking for a recipe for homemade chocolate cake. Can you help me with that?";
      if (GlutenFreeCheck) {
        askedTemplate =
          "Hi ChatGPT, I'm looking for a recipe for homemade gluten free chocolate cake . Can you help me with that?";
      }
    }
    myFunction(askedTemplate);
  }

  const ChocolateCakeCB = (event) => {
    setChocolateCakeChecked(event.target.checked);
  };

  const allergiesCB = (event) => {
    setGlutenFreeChecked(event.target.checked);
  };

  return (
    <div className="HomePage">
      <form action="">
        <h2>AllerChef</h2>
        <button
          id="submit"
          disabled={!ChocolateCakeCheck}
          onClick={getChatGptAns}
        >
          give me recipe
        </button>
        <label>
          <input
            type="checkbox"
            id="message"
            checked={ChocolateCakeCheck}
            onChange={ChocolateCakeCB}
          />
          chocolate cake
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
