import React from "react";
import { Form } from "react-bootstrap";

function type(props) {
  return (
    <div className="app">
      <Form.Check
        type="checkbox"
        value={props.cle}
        onChange={props.handleChange}
        name="type"
        label={props.nom}
      />
    </div>
  );
}

export default type;
