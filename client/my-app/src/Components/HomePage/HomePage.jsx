import React from "react";
import { myFunction } from "./create_file";

// const baseUrl = 'http://localhost:8080/' //URL of server.
function HomePage() {
  async function getChatGptAns(e) {
    myFunction();
  }

  return (
    <div className="HomePage">
      <form action="">
        <h2>Chat gpt-3.5 api</h2>
        <input type="text" name="message" id="message"></input>
        <button id="submit" onClick={getChatGptAns}>
          {" "}
          send{" "}
        </button>
      </form>
      <div id="chat-log"></div>
      {/* <script src="create_file.js"></script> */}
    </div>
  );
}

export default HomePage;
