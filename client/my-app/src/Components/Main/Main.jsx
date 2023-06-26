import "./Main.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

const baseUrl = "http://localhost:8080/";

function Main() {
  let Location = useLocation();
  const { state } = Location;
  const [id, setId] = useState(state.id_num);

  return (
    <div className="Main">
      <h2>Hello {id}!</h2>
      <br />
      <br />
      <p>
        Welcome to the AllerChef app!
        <br />
        You can navigate the menu to search for recipe, show your saves recipe
        and modify your accout.
      </p>
    </div>
  );
}

export default Main;
