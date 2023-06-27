import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/"; //URL of server.
function Setting() {
  let Location = useLocation();
  const { state } = Location;
  const navigate = useNavigate();

  const [id, setId] = useState(state.id_num);

  const [GlutenCheck, setGlutenFreeChecked] = useState(false);
  const [NutsCheck, setNutsChecked] = useState(false);
  const [MilkCheck, setMilkChecked] = useState(false);
  const [EggsCheck, setEggsChecked] = useState(false);
  const [SesameCheck, setSesameChecked] = useState(false);
  const [message, setmessage] = useState("");
  const [textAler, setTextAler] = useState("");

  async function addAllergies(e) {
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

    if (textAler != "") {
      alergias.push(textAler);
    }
    const res = await fetch(baseUrl + "addAllergies/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: id,
        alergias: alergias,
      }),
    });
    const data = await res.json();
    setmessage("Suecess added");
  }

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
  const alerInput = (event) => {
    setTextAler(event.target.value);
  };

  return (
    <div className="Setting">
      <label id="my-label-alergias">Added your alergias: </label>
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
      <label>
        <h4>
          Other:
          <input type="text" id="aller" value={textAler} onChange={alerInput} />
        </h4>
      </label>
      <br></br>
      <br></br>
      <button id="my-button-rgister" onClick={addAllergies}>
        Submit
      </button>
      <p id="my-p-set">{message}</p>
    </div>
  );
}

export default Setting;
