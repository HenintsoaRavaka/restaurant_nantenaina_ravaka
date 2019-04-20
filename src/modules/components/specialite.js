import React from "react";
import { Form } from "react-bootstrap";

function specialite(props) {
  return (
    <div className="app">
      <Form.Check
        type="checkbox"
        value={props.cle}
        onChange={props.handleChange}
        name="specialite"
        label={props.nom}
      />
    </div>
  );
}

export default specialite;
