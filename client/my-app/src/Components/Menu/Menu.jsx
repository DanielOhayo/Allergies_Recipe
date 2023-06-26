import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Menu.css";
import React from "react";

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
        Home
      </Link>
      <Link to="/layout/savesRecipe" state={{ id_num: id }}>
        Recipes
      </Link>
      <Link to="/layout/search" state={{ id_num: id, alergias: alergias }}>
        Search
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Menu;
