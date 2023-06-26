import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./Registration.css";
import ExitImage from "../Assets/exit.png";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/"; //URL of server.
function Registration() {
  let Location = useLocation();
  const { state } = Location;
  const navigate = useNavigate();

  const [userName, setUserName] = useState(""); //user name when client enter an input.
  const [pass, setPass] = useState(""); //password when client enter an input.

  const [GlutenCheck, setGlutenFreeChecked] = useState(false);
  const [NutsCheck, setNutsChecked] = useState(false);
  const [MilkCheck, setMilkChecked] = useState(false);
  const [EggsCheck, setEggsChecked] = useState(false);
  const [SesameCheck, setSesameChecked] = useState(false);
  const [message, setmessage] = useState("");

  function backToLogin() {
    navigate("/", {});
  }

  async function registerUser(e) {
    e.preventDefault();
    let alergias = [];
    if (GlutenCheck) {
      alergias.push("gluten");
    }
    if (NutsCheck) {
      alergias.push("nuts");
    }
    if (MilkCheck) {
      alergias.push("milk");
    }
    if (EggsCheck) {
      alergias.push("eggs");
    }
    if (SesameCheck) {
      alergias.push("sesame");
    }
    const res = await fetch(baseUrl + "register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userName,
        password: pass,
        alergias: alergias,
      }),
    });
    const data = await res.json();
    if (data) {
      setmessage("Suecess registration");
    } else {
      setmessage("user name is already exist. please try again");
    }
  }

  const handleChangeForUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeForPassword = (event) => {
    setPass(event.target.value);
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

  return (
    <div className="Registration">
      <label>User name: </label>
      <input
        type="text"
        id="my-input-login"
        onChange={handleChangeForUserName}
      />
      <br></br>
      <br></br>
      <label id="my-label-password">Password: </label>
      <input
        class="my-input-password"
        type="password"
        id="my-input-login"
        onChange={handleChangeForPassword}
      />
      <label id="my-label-alergias">Choose your alergias: </label>
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
      <br></br>
      <br></br>
      <button id="my-button-back" onClick={backToLogin}>
        Back
      </button>
      <button id="my-button-rgister" onClick={registerUser}>
        Submit
      </button>
      <p id="my-p-login">{message}</p>
    </div>
  );
}

export default Registration;
