import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Menu.css";
import React from "react";
import Search from "../Assets/search.png";
import Home from "../Assets/home.png";
import Recipe from "../Assets/recipe.png";
import Logout from "../Assets/logout.png";
import Setting from "../Assets/setting.png";

const baseUrl = "http://localhost:8080/";

function Menu() {
  let Location = useLocation();
  const { state } = Location;
  const [id, setId] = useState(state.id_num);
  const [alergias, setAlergias] = useState(state.alergias);

  const navigate = useNavigate();

  const logout = (event) => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="Menu">
      <Link to="/layout/main" state={{ id_num: id }}>
        <img id="my-img-btn" src={Home}></img>
        Home
      </Link>
      <Link to="/layout/savesRecipe" state={{ id_num: id }}>
        <img id="my-img-btn" src={Recipe}></img>
        Recipes
      </Link>
      <Link to="/layout/search" state={{ id_num: id, alergias: alergias }}>
        <img id="my-img-btn" src={Search}></img>
        Search
      </Link>
      <img id="my-logout-btn" src={Logout} onClick={logout}></img>
      <img id="my-logout-btn" src={Setting}></img>
    </div>
  );
}

export default Menu;
